import { IsNumber } from 'class-validator';

export class DeleteExampleDto {
  @IsNumber()
  id: number;
}
