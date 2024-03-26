import {
  Controller,
  Get,
  Param,
  Delete,
  Patch,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoomService } from './rooms.service';
import { RolesGuard } from '../users/guard/roleGuard.guard';
import { Role } from '../users/enum/roles.enum';
import { UpdateRoomBodyDto } from './dto/updateRoomBody.dto';
import { Roles } from '../users/decorator/roles.decorator';

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
  getRoomById(@Param('roomId', ParseIntPipe) roomId: number): Promise<any> {
    return this.roomService.getRoomById(roomId);
  }

  @Delete('/:roomId')
  deleteRoom(@Param('roomId', ParseIntPipe) roomId: number): Promise<any> {
    return this.roomService.deleteRoom(roomId);
  }

  @Patch('/:roomId')
  updateRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() body: UpdateRoomBodyDto,
  ): Promise<any> {
    return this.roomService.updateRoom(roomId, body);
  }
}
