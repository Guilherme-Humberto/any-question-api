import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { UserEntity } from '../domain/entities/user.entity';

export class SessionUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class SessionUserServiceOutPut extends PartialType(UserEntity) {}
export class LoginUserOutPut {
  user: SessionUserServiceOutPut;
  token: string;
}
