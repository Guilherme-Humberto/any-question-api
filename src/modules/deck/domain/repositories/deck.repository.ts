import { CreateDeckDto } from '@modules/deck/dto/create-deck.dto';
import { UpdateDeckDto } from '@modules/deck/dto/update-deck.dto';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DeckEntity } from '../entities/deck.entity';

export interface IDeckRepository {
  create(data: CreateDeckDto): Promise<DeckEntity>;
  update(data: UpdateDeckDto): Promise<void>;
  delete(id: number): Promise<void>;
  findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<DeckEntity> | DeckEntity[]>;
  findOne(where: object): Promise<DeckEntity>;
}
