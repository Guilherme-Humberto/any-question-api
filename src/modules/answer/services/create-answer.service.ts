import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AnswerEntity } from '../domain/entities/answer.entity';
import { IAnswerRepository } from '../domain/repositories/answer.repository';
import { CreateAnswerDto } from '../dto/create-answer.dto';
import { AnswerRepository } from '../infra/repositories/typeorm/answer.repository';

@Injectable()
export class CreateAnswerService {
  constructor(
    @Inject(AnswerRepository) private readonly answer: IAnswerRepository,
  ) {}

  public async execute(data: CreateAnswerDto): Promise<AnswerEntity> {
    const answer = await this.answer.findOneAnswer({
      form_id: data.form_id,
      question_id: data.question_id,
    });

    if (answer) throw new BadRequestException('Answer already exists')

    return await this.answer.create(data);
  }
}
