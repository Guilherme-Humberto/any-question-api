import { IsNumber, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  title: string;

  @IsString()
  color: string;

  @IsNumber()
  flashcard: number;
}
