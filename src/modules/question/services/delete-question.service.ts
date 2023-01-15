import { Inject, Injectable } from '@nestjs/common';
import { IQuestionRepository } from '../domain/repositories/question.repository';
import { QuestionRepository } from '../infra/repositories/typeorm/question.repository';

@Injectable()
export class DeleteQuestionService {
  constructor(
    @Inject(QuestionRepository) private readonly question: IQuestionRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.question.delete(id);
  }
}
