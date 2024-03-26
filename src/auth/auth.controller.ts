import {
  Controller,
  ParseIntPipe,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RefreshResponseDto } from './dto/refreshTokenResponse.dto';
import { SignInResponseDto } from './dto/signInResponse.dto';
import { User } from '../users/entities/user.entity';
import { UserCredentialsDto } from '../users/dto/userCredentialsDto.dto';
import { CreateUserDto } from '../users/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: CreateUserDto): Promise<User> {
    return await this.authService.signUp(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signIn(
    @Body() userCredentialsDto: UserCredentialsDto,
  ): Promise<SignInResponseDto> {
    return await this.authService.signIn(userCredentialsDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('signout/:userId')
  async signOut(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<string> {
    return await this.authService.signOut(userId);
  }

  @Post('refresh')
  async refreshToken(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<RefreshResponseDto> {
    return await this.authService.refreshToken(refreshToken);
  }
}
