import { IDeckRepository } from '@modules/deck/domain/repositories/deck.repository';
import { DeckRepository } from '@modules/deck/infra/repositories/typeorm/deck.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IFlashcardRepository } from '../domain/repositories/flashcard.repository';
import { FlashcardRepository } from '../infra/repositories/typeorm/flashcard.repository';

@Injectable()
export class DeleteFlashcardService {
  constructor(
    @Inject(FlashcardRepository)
    private readonly flashcard: IFlashcardRepository,
    @Inject(DeckRepository)
    private readonly deck: IDeckRepository,
  ) {}

  public async execute(id: number, deckId: number): Promise<void> {
    const deck = await this.deck.findOne({ id: deckId });

    if (!deck) throw new BadRequestException('Deck not found');

    await this.flashcard.delete(id, deckId);
  }
}
