import { Inject, Injectable } from '@nestjs/common';
import { QuestionEntity } from '../domain/entities/question.entity';
import { IQuestionRepository } from '../domain/repositories/question.repository';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionRepository } from '../infra/repositories/typeorm/question.repository';

@Injectable()
export class CreateQuestionService {
  constructor(
    @Inject(QuestionRepository) private readonly question: IQuestionRepository,
  ) {}

  public async execute(data: CreateQuestionDto): Promise<QuestionEntity> {
    return await this.question.create(data);
  }
}
