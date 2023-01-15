import * as bcrypt from 'bcrypt'
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../infra/repositories/typeorm/user.repository';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(data: CreateUserDto): Promise<UserEntity> {
    const user = await this.user.findByEmail(data.email)

    if (user) throw new BadRequestException('User already exists')

    const passwordHash = await bcrypt.hash(data.password, 8);

    const userData = { ...data, password: String(passwordHash)}
    return await this.user.create(userData)
  }
}
