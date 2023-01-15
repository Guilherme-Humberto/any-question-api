import { Inject, Injectable } from '@nestjs/common';
import { QuestionEntity } from '../domain/entities/question.entity';
import { IQuestionRepository } from '../domain/repositories/question.repository';
import { QuestionRepository } from '../infra/repositories/typeorm/question.repository';

@Injectable()
export class FindAllQuestionService {
  constructor(
    @Inject(QuestionRepository) private readonly question: IQuestionRepository,
  ) {}

  public async execute(): Promise<QuestionEntity[]> {
    return await this.question.findAll();
  }
}
