import { IsNumber, IsString } from 'class-validator';

export class SignInResponseDto {
  @IsNumber()
  userId: number;

  @IsString()
  email: string;

  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}
