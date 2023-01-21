import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDeckDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  user: UserEntity;
}
