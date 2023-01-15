import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository';
import { UserRepository } from '../infra/repositories/typeorm/user.repository';

@Injectable()
export class FindAllUserService {
  constructor(
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(): Promise<UserEntity[]> {
    return await this.user.findAll();
  }
}
