import { Inject, Injectable } from '@nestjs/common';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DeckEntity } from '../domain/entities/deck.entity';
import { IDeckRepository } from '../domain/repositories/deck.repository';
import { DeckRepository } from '../infra/repositories/typeorm/deck.repository';

@Injectable()
export class FindAllDeckService {
  constructor(@Inject(DeckRepository) private readonly deck: IDeckRepository) {}

  public async execute(
    options: IPaginationOptions,
  ): Promise<Pagination<DeckEntity> | DeckEntity[]> {
    return await this.deck.findAll(options);
  }
}
