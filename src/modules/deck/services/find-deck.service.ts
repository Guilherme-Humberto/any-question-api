import { Inject, Injectable } from '@nestjs/common';
import { DeckEntity } from '../domain/entities/deck.entity';
import { IDeckRepository } from '../domain/repositories/deck.repository';
import { DeckRepository } from '../infra/repositories/typeorm/deck.repository';

@Injectable()
export class FindAllDeckService {
  constructor(
    @Inject(DeckRepository) private readonly deck: IDeckRepository,
  ) {}

  public async execute(): Promise<DeckEntity[]> {
    return await this.deck.findAll();
  }
}
