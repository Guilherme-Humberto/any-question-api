import { IsNumber } from 'class-validator';

export class DeleteFlashcardDto {
  @IsNumber()
  id: number;
}
