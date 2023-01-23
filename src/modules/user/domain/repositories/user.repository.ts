import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { SessionUserDto } from '@modules/user/dto/session-user.dto';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  findOne(parameter: Partial<UserEntity>): Promise<UserEntity>;
  create(data: CreateUserDto): Promise<UserEntity>;
  session(data: SessionUserDto): string;
  update(data: UpdateUserDto): Promise<UserEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<UserEntity[]>;
}
