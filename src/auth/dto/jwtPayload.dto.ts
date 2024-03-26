import { IsNumber, IsString } from 'class-validator';

export class JwtPayload {
  @IsNumber()
  userId: number;

  @IsString()
  email: string;
}
