import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DeckEntity } from '../domain/entities/deck.entity';
import { IDeckRepository } from '../domain/repositories/deck.repository';
import { DeckRepository } from '../infra/repositories/typeorm/deck.repository';

@Injectable()
export class FindByIdDeckService {
  constructor(@Inject(DeckRepository) private readonly deck: IDeckRepository) {}

  public async execute(id: number): Promise<DeckEntity> {
    const findDeck = await this.deck.findOne({ id });
    if (!findDeck) throw new NotFoundException('Deck not found');
    return findDeck;
  }
}
