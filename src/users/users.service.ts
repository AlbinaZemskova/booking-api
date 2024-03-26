import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { Redis } from 'ioredis';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import MysqlErrorCodes from '../constants/mysqlErrorCodeConstant.constant';
import { Room } from '../rooms/entities/room.entity';
import { RoomAttributes } from '../rooms/entities/roomAttributes.entity';
import { Role } from './enum/roles.enum';
import { RoomService } from '../rooms/rooms.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomAttributes)
    private readonly roomAttributesRepository: Repository<RoomAttributes>,
    private readonly roomService: RoomService,
  ) {}

  /**
   * Create a new user with received credentials
   * @param body
   */
  async createUser(body: CreateUserDto): Promise<User> {
    const salt: string = await bcrypt.genSalt();

    const newUserData = {
      ...body,
      role: Role.User,
      password: await bcrypt.hash(body.password, salt),
    };

    try {
      return await this.userRepository.save(newUserData);
    } catch (error) {
      if (error?.errno === MysqlErrorCodes.DuplicateEntry) {
        throw new HttpException(
          'User already exist, please login instead.',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Get all booked rooms by current user
   *
   * @param userId
   */
  async getUserRooms(userId: number): Promise<Room[]> {
    return await this.roomRepository
      .createQueryBuilder('room')
      .innerJoin(
        RoomAttributes,
        'roomAttributes',
        'roomAttributes.RoomID = room.RoomID',
      )
      .where('room.DataOwnerID = :userId', { userId })
      .getRawMany();
  }

  /**
   * Reserve a room
   *
   * @param roomId
   * @param user
   */
  async bookedRoom(roomId: number, user: User): Promise<string> {
    const room = await this.roomService.getRoomById(roomId);
    const redisClient: Redis = AuthService.redisInstance;

    if (room.DataOwnerID) {
      return 'Room has already booked';
    }

    await this.roomRepository.update(
      { RoomID: roomId },
      { DataOwnerID: user.userId },
    );
    await this.roomAttributesRepository.update(
      { RoomID: roomId },
      { isAvailable: false },
    );

    try {
      const message = JSON.stringify({ roomId, email: user.email });
      const reply = await redisClient.rpush('emailQueue', message);

      this.logger.log('Message added to email queue. Reply:', reply);

      return `Room ${roomId} successfully booked`;
    } catch (e) {
      this.logger.debug(`Error adding message to queue: ${e.toString()}`);
    }
  }

  /**
   * View reserved room
   *
   * @param roomId
   * @param userId
   */
  async viewRoomReservation(roomId: number, userId: number): Promise<Room> {
    const userRoom = await this.roomRepository
      .createQueryBuilder('room')
      .select([
        'room.RoomID as id',
        'roomAttributes.description as roomDescription',
        'roomAttributes.price as price',
        'roomAttributes.roomType as roomType',
      ])
      .innerJoin(
        RoomAttributes,
        'roomAttributes',
        'roomAttributes.RoomID = room.RoomID',
      )
      .where('room.DataOwnerID = :userId and room.RoomID = :roomId', {
        userId,
        roomId,
      })
      .getOne();

    if (!userRoom) {
      throw new NotFoundException('Room not found');
    }

    return userRoom;
  }

  /**
   * Cancel reservation for room
   *
   * @param roomId
   * @param userId
   */
  async cancelRoomReservation(roomId: number, userId: number): Promise<string> {
    const room: Room = await this.roomRepository.findOne({
      where: {
        RoomID: roomId,
        DataOwnerID: userId,
      },
    });

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.roomRepository.update(roomId, { DataOwnerID: null });
    await this.roomAttributesRepository.update(roomId, {
      isAvailable: true,
    });

    return `Reservation for room ${roomId} was canceled`;
  }

  /**
   * Get user by email
   *
   * @param email
   */
  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  /**
   * Get user by user credentials
   *
   * @param email
   * @param password
   */
  async getUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    const user = await this.getUserByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      }
    }
  }
}
