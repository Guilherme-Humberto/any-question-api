import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  front: string;

  @IsString()
  back: string;

  @IsString()
  @IsOptional()
  status: string;

  @IsNumber()
  deck: DeckEntity;
}
