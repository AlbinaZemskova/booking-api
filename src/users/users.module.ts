import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../rooms/entities/room.entity';
import { RoomAttributes } from '../rooms/entities/roomAttributes.entity';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    RoomsModule,
    TypeOrmModule.forFeature([User, Room, RoomAttributes]),
  ],
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
