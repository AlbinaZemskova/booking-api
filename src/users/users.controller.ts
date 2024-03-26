import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guard/roleGuard.guard';
import { Role } from './enum/roles.enum';
import { UserService } from './users.service';
import { GetUser } from './decorator/getUser.decorator';
import { User } from './entities/user.entity';
import { Room } from '../rooms/entities/room.entity';
import { Roles } from './decorator/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.User)
@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('/rooms')
  getUserRooms(@GetUser() user: User): Promise<Room[]> {
    return this.userService.getUserRooms(user.userId);
  }

  @Patch('/rooms/roomId')
  bookedRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @GetUser() user: User,
  ): Promise<Room> {
    return this.userService.bookedRoom(roomId);
  }

  @Get('/rooms/:roomId')
  viewRoomReservation(
    @Param('roomId', ParseIntPipe) roomId: number,
    @GetUser() user: User,
  ): Promise<Room> {
    return this.userService.viewRoomReservation(roomId, user.userId);
  }

  @Delete('/rooms/:roomId')
  cancelRoomReservation(
    @Param('roomId', ParseIntPipe) roomId: number,
    @GetUser() user: User,
  ): Promise<any> {
    return this.userService.cancelRoomReservation(roomId, user);
  }
}
