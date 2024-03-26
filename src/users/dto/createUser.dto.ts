import { Role } from '../enum/roles.enum';
import { IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  roles: Role[];
}
