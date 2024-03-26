import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomsController } from './rooms.controller';
import { RoomService } from './rooms.service';
import { Room } from './entities/room.entity';
import { RoomAttributes } from './entities/roomAttributes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomAttributes])],
  controllers: [RoomsController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomsModule {}
