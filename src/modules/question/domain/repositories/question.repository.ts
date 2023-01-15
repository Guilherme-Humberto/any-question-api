import { CreateQuestionDto } from '@modules/question/dto/create-question.dto';
import { UpdateQuestionDto } from '@modules/question/dto/update-question.dto';
import { QuestionEntity } from '../entities/question.entity';

export interface IQuestionRepository {
  create(data: CreateQuestionDto): Promise<QuestionEntity>;
  update(data: UpdateQuestionDto): Promise<QuestionEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<QuestionEntity[]>;
  findOneQuestion(where: object): Promise<QuestionEntity>;
}
