import { IsNumber } from 'class-validator';

export class DeleteUserDto {
  @IsNumber()
  user_id: number;
}
