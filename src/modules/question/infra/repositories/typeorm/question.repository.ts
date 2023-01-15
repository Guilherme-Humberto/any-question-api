import { QuestionEntity } from '@modules/question/domain/entities/question.entity';
import { IQuestionRepository } from '@modules/question/domain/repositories/question.repository';
import { CreateQuestionDto } from '@modules/question/dto/create-question.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly repository: Repository<QuestionEntity>,
  ) {}

  async create(data: CreateQuestionDto): Promise<QuestionEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: QuestionEntity): Promise<QuestionEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<QuestionEntity[]> {
    return await this.repository.find();
  }

  async findOneQuestion(where: object): Promise<QuestionEntity> {
    return await this.repository.findOne({ where });
  }
}
