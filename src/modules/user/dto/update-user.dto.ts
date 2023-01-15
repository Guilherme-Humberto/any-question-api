import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @Length(8, 16)
  @IsOptional()
  password: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
