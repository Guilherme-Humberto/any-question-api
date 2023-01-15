import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/repositories/user.repository';
import { UserRepository } from '../infra/repositories/typeorm/user.repository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.user.delete(id);
  }
}
