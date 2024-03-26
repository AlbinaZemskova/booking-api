import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  Post,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './rooms.service';
import { RolesGuard } from '../users/guard/roleGuard.guard';
import { Role } from '../users/enum/roles.enum';
import { UpdateRoomBodyDto } from './dto/updateRoomBody.dto';
import { Roles } from '../users/decorator/roles.decorator';
import { RoomAttributes } from './entities/roomAttributes.entity';
import { Room } from './entities/room.entity';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.Admin)
@Controller('rooms')
export class RoomsController {
  constructor(private roomService: RoomService) {}

  @Get()
  getRooms(): Promise<any> {
    return this.roomService.getAllRooms();
  }

  @Get('/:roomId')
  getRoomById(@Param('roomId', ParseIntPipe) roomId: number): Promise<Room> {
    return this.roomService.getRoomById(roomId);
  }

  @Post()
  createRoom(@Body() body: UpdateRoomBodyDto): Promise<RoomAttributes> {
    return this.roomService.createRoom(body);
  }

  @Delete('/:roomId')
  deleteRoom(@Param('roomId', ParseIntPipe) roomId: number): Promise<void> {
    return this.roomService.deleteRoom(roomId);
  }

  @Patch('/:roomId')
  updateRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() body: UpdateRoomBodyDto,
  ): Promise<void> {
    return this.roomService.updateRoom(roomId, body);
  }
}
