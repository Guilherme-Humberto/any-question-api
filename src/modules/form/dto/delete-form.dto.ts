import { IsNumber } from 'class-validator';

export class DeleteFormDto {
  @IsNumber()
  form_id: number;
}
