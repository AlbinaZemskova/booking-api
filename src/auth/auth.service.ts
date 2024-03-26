import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import Redis from 'ioredis';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { SignInResponseDto } from './dto/signInResponse.dto';
import { UserCredentialsDto } from '../users/dto/userCredentialsDto.dto';
import { JwtPayload } from './dto/jwtPayload.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Injectable()
export class AuthService {
  public static redisInstance: Redis;
  private logger = new Logger('AuthService');

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {
    if (!AuthService.redisInstance) {
      // @ts-ignore
      AuthService.redisInstance = new Redis({
        keyPrefix: 'jwt-refresh_',
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(<string>process.env.REDIS_PORT) || '6379',
      });
    }
  }

  /**
   * Creates new user with received credentials
   * @param body
   */
  async signUp(body: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(body);
  }

  /**
   * Checks passed credentials are valid and generates JWT access and refresh tokens
   *
   * @param email
   * @param password
   */
  async signIn({
    email,
    password,
  }: UserCredentialsDto): Promise<SignInResponseDto> {
    const user: User = await this.usersService.getUserByEmail(email);
    const validatePassword = await bcrypt.compare(password, user.password);

    if (!user || !validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { userId } = user;
    const payload: JwtPayload = { userId, email };
    const accessToken = this.jwtService.sign(payload);

    const refreshTokenExpiration =
      process.env.REFRESH_TOKEN_EXPIRATION || 86400;

    const refreshToken =
      (await AuthService.redisInstance.get(userId.toString())) ||
      this.jwtService.sign(payload, {
        expiresIn: refreshTokenExpiration,
      });

    await AuthService.redisInstance.set(
      userId.toString(),
      refreshToken,
      'EX',
      refreshTokenExpiration,
    );

    return { accessToken, refreshToken, email, userId };
  }

  /**
   * Resets refresh token
   *
   * @param userId
   */
  async signOut(userId: number) {
    await AuthService.redisInstance.del(userId.toString());
    return 'user logout';
  }

  /**
   * Refreshes access token if passed refresh token is valid
   *
   * @param refreshToken
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const { userId, email }: JwtPayload = await this.jwtService.verify(
        refreshToken,
        { secret: process.env.JWT_ACCESS_TOKEN_SECRET },
      );

      if (await AuthService.redisInstance.get(userId.toString())) {
        const accessToken = await this.jwtService.sign({ userId, email });

        return { accessToken };
      }
    } catch (error) {
      this.logger.debug(`Cannot refresh token: ${error.toString()}`);
    }

    throw new UnauthorizedException(
      'The refresh token is expired, or it is wrong',
    );
  }

  /**
   * Returns user
   *
   * @param email
   * @param plainTextPassword
   */
  async getAuthenticatedUser(email: string, plainTextPassword: string) {
    return await this.usersService.getUserByEmailAndPassword(
      email,
      plainTextPassword,
    );
  }
}
