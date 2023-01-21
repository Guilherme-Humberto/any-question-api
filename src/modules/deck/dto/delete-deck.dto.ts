import { IsNumber } from 'class-validator';

export class DeleteDeckDto {
  @IsNumber()
  id: number;
}
