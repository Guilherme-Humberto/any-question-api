import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { IUserRepository } from '@modules/user/domain/repositories/user.repository';
import { generateJwtToken } from '@shared/utils/generate-jwt-token';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(parameter: object): Promise<UserEntity> {
    return await this.repository.findOne({ where: parameter });
  }

  session(data: UserEntity): string {
    return generateJwtToken(data);
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

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find({
      relations: ['decks'],
    });
  }
}
