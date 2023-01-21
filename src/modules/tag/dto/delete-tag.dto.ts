import { IsNumber } from 'class-validator';

export class DeleteTagDto {
  @IsNumber()
  id: number;
}
