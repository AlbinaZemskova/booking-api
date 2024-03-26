import { IsString } from 'class-validator';

export class RefreshResponseDto {
  @IsString()
  accessToken: string;
}
