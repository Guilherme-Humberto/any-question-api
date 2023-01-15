import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { QuestionEntity } from '../domain/entities/question.entity';
import { IQuestionRepository } from '../domain/repositories/question.repository';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { QuestionRepository } from '../infra/repositories/typeorm/question.repository';

@Injectable()
export class UpdateQuestionService {
  constructor(
    @Inject(QuestionRepository) private readonly question: IQuestionRepository,
  ) {}

  public async execute(
    id: number,
    data: UpdateQuestionDto,
  ): Promise<QuestionEntity> {
    const old = await this.question.findOneQuestion({ id });

    if (!old) throw new NotFoundException('Question not found');

    const newUser = Object.assign(old, data);

    return await this.question.update(newUser);
  }
}
