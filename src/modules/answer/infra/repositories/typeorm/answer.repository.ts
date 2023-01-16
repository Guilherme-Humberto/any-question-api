import { AnswerEntity } from '@modules/answer/domain/entities/answer.entity';
import { IAnswerRepository } from '@modules/answer/domain/repositories/answer.repository';
import { CreateAnswerDto } from '@modules/answer/dto/create-answer.dto';
import { UpdateAnswerDto } from '@modules/answer/dto/update-answer.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerRepository implements IAnswerRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly repository: Repository<AnswerEntity>,
  ) {}

  async create(data: CreateAnswerDto): Promise<AnswerEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: UpdateAnswerDto): Promise<void> {
    await this.repository.save(data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<AnswerEntity[]> {
    return await this.repository.find();
  }

  async findOneAnswer(where: object): Promise<AnswerEntity> {
    return await this.repository.findOne({ where });
  }
}
