import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { RoomAttributes } from './entities/roomAttributes.entity';
import { UpdateRoomBodyDto } from './dto/updateRoomBody.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomAttributes)
    private readonly roomAttributesRepository: Repository<RoomAttributes>,
  ) {}

  /**
   * Fetch all rooms and their attributes
   */
  async getAllRooms() {
    return this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect(
        RoomAttributes,
        'attributes',
        'attributes.RoomID = room.RoomID',
      )
      .getRawMany();
  }

  /**
   * Get one room
   */
  async getRoomById(roomId: number): Promise<Room> {
    const room = await this.roomRepository
      .createQueryBuilder('room')
      .innerJoinAndSelect(
        RoomAttributes,
        'attributes',
        'attributes.RoomID = room.RoomID',
      )
      .where('room.RoomId = :roomId', { roomId })
      .getOne();

    if (!room) {
      throw new NotFoundException(`Room with id ${roomId} not found`);
    }

    return room;
  }

  /**
   * Create room
   *
   * @param body
   */
  async createRoom(body: UpdateRoomBodyDto): Promise<RoomAttributes> {
    const savedRoom = await this.roomRepository.save(new Room());

    return await this.roomAttributesRepository.save({
      ...body,
      RoomID: savedRoom.RoomID,
    });
  }

  /**
   * Delete room
   */
  async deleteRoom(roomId: number): Promise<void> {
    const room: Room = await this.getRoomById(roomId);

    await this.roomRepository.delete({ RoomID: room.RoomID });
  }

  /**
   * Update room
   *
   * @param roomId
   * @param body
   */
  async updateRoom(roomId: number, body: UpdateRoomBodyDto): Promise<void> {
    await this.getRoomById(roomId);

    await this.roomAttributesRepository.update(roomId, body);
  }
}
