import { IsEnum, IsNumber, IsString } from 'class-validator';
import { RoomType } from '../enums/roomType.enum';

export class UpdateRoomBodyDto {
  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsEnum(RoomType)
  roomType: RoomType;
}
