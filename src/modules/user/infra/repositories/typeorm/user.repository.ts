import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { IUserRepository } from '@modules/user/domain/repositories/user.repository';
import { sign } from 'jsonwebtoken';
import { Envs } from '@shared/envs/envs';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOneUser(where: object): Promise<UserEntity> {
    return await this.repository.findOne({ where });
  }

  async findById(id: number): Promise<UserEntity> {
    return await this.repository.findOne({ where: { user_id: id } });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { email } });
  }

  session(data: UserEntity): string {
    const secret = Envs.SECRET_TOKEN;
    const expiration = Envs.EXPIRATION_TOKEN;

    const payload = {
      id: data.user_id,
      email: data.email,
    }

    const options = {
      expiresIn: expiration,
      subject: String(data.user_id),
    }

    return sign(
      payload,
      secret,
      options
    );
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);
    return response;
  }

  async update(data: UserEntity): Promise<UserEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(user_id: number): Promise<void> {
    await this.repository.delete({ user_id });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find();
  }
}
