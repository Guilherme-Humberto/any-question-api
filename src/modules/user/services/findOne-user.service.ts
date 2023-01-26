import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository';
import { UserRepository } from '../infra/repositories/typeorm/user.repository';

@Injectable()
export class FindOneUserService {
  constructor(@Inject(UserRepository) private readonly user: IUserRepository) {}

  public async execute(options: object): Promise<UserEntity> {
    return await this.user.findOne(options);
  }
}
