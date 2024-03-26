import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { RoomType } from '../enums/roomType.enum';

@Entity('room_attributes')
export class RoomAttributes {
  @PrimaryGeneratedColumn()
  @IsNumber()
  RoomAttributesID: number;

  @Column()
  RoomID: number;

  @Column()
  @IsString()
  description: string;

  @Column({ type: 'enum', enum: RoomType, default: RoomType.Deluxe })
  roomType: RoomType;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column()
  @IsBoolean()
  isAvailable: boolean;
}
