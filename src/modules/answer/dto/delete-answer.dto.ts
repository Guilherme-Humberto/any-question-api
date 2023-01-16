import { IsNumber } from 'class-validator';

export class DeleteAnswerDto {
  @IsNumber()
  id: number;
}
