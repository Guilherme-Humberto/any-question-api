import { UserEntity } from '@modules/user/domain/entities/user.entity';

export interface ILocalAuthRepository {
  session(data: Partial<UserEntity>): Promise<UserEntity>;
}
