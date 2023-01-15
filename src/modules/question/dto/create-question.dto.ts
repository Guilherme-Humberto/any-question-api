import { IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  form_id: number;
}
