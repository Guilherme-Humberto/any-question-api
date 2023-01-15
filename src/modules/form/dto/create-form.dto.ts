import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFormDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsNumber()
  user_id: number;
}
