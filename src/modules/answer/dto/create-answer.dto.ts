import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from '../domain/entities/answer.entity';

export class CreateAnswerDto {
  @IsNumber()
  form_id: number;

  @IsNumber()
  question_id: number;

  @IsString()
  @IsOptional()
  status: StatusEnum
}
