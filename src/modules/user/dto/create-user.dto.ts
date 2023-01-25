import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;

  @IsString()
  @IsOptional()
  type_auth?: string;
}
