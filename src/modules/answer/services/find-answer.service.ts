import { Inject, Injectable } from '@nestjs/common';
import { AnswerEntity } from '../domain/entities/answer.entity';
import { IAnswerRepository } from '../domain/repositories/answer.repository';
import { AnswerRepository } from '../infra/repositories/typeorm/answer.repository';

@Injectable()
export class FindAllAnswerService {
  constructor(
    @Inject(AnswerRepository) private readonly answer: IAnswerRepository,
  ) {}

  public async execute(): Promise<AnswerEntity[]> {
    return await this.answer.findAll();
  }
}
