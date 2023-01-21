import { CreateDeckDto } from '@modules/deck/dto/create-deck.dto';
import { UpdateDeckDto } from '@modules/deck/dto/update-deck.dto';
import { DeckEntity } from '../entities/deck.entity';

export interface IDeckRepository {
  create(data: CreateDeckDto): Promise<DeckEntity>;
  update(data: UpdateDeckDto): Promise<DeckEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<DeckEntity[]>;
  findOne(where: object): Promise<DeckEntity>;
}
