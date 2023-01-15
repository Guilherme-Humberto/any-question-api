import { OmitType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { UserEntity } from '../domain/entities/user.entity';

export class SessionUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SessionUserServiceOutPut extends OmitType(UserEntity, [
  'user_id',
  'password',
  'created_at',
  'updated_at',
]) {}
export class LoginUserOutPut {
  user: SessionUserServiceOutPut;
  token: string;
}
