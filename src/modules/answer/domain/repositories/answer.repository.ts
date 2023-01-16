import { CreateAnswerDto } from '@modules/answer/dto/create-answer.dto';
import { UpdateAnswerDto } from '@modules/answer/dto/update-answer.dto';
import { AnswerEntity } from '../entities/answer.entity';

export interface IAnswerRepository {
  create(data: CreateAnswerDto): Promise<AnswerEntity>;
  update(data: UpdateAnswerDto): Promise<void> ;
  delete(id: number): Promise<void>;
  findAll(): Promise<AnswerEntity[]>;
  findOneAnswer(where: object): Promise<AnswerEntity>;
}
