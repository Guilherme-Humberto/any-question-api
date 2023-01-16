import { Inject, Injectable } from '@nestjs/common';
import { AnswerEntity } from '../domain/entities/answer.entity';
import { IAnswerRepository } from '../domain/repositories/answer.repository';
import { AnswerRepository } from '../infra/repositories/typeorm/answer.repository';

@Injectable()
export class DeleteAnswerService {
  constructor(
    @Inject(AnswerRepository) private readonly answer: IAnswerRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.answer.delete(id);
  }
}
