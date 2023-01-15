import * as bcrypt from 'bcrypt'
import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../domain/entities/user.entity';
import { IUserRepository } from '../domain/repositories/user.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserRepository } from '../infra/repositories/typeorm/user.repository';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(
    id: number,
    data: UpdateUserDto,
  ): Promise<UserEntity> {
    const oldUser = await this.user.findById(id)
    if (!oldUser) throw new NotFoundException('User not found');

    if (oldUser.email !== data.email) {
      const hasSameEmail = await this.user.findByEmail(data.email)
      if (hasSameEmail) throw new BadRequestException('User already exists')
    }

    let password = oldUser.password

    if (data.password) {
      password = await bcrypt.hash(data.password, 8)
    }

    const newUser = Object.assign(oldUser, {
      ...data,
      password
    })

    return await this.user.update(newUser);
  }
}
