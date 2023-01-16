import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAnswerRepository } from '../domain/repositories/answer.repository';
import { UpdateAnswerDto } from '../dto/update-answer.dto';
import { AnswerRepository } from '../infra/repositories/typeorm/answer.repository';

@Injectable()
export class UpdateAnswerService {
  constructor(
    @Inject(AnswerRepository) private readonly answer: IAnswerRepository,
  ) {}

  public async execute(
    id: number,
    data: UpdateAnswerDto,
  ): Promise<void> {
    const old = await this.answer.findOneAnswer({ id });

    if (!old) throw new NotFoundException('Answer not found');

    const newUser = Object.assign(old, data)

    await this.answer.update(newUser);
  }
}
