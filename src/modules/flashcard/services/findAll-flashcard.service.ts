import { Inject, Injectable } from '@nestjs/common';
import { FlashcardEntity } from '../domain/entities/flashcard.entity';
import { IFlashcardRepository } from '../domain/repositories/flashcard.repository';
import { FlashcardRepository } from '../infra/repositories/typeorm/flashcard.repository';

@Injectable()
export class FindAllFlashcardService {
  constructor(
    @Inject(FlashcardRepository)
    private readonly flashcard: IFlashcardRepository,
  ) {}

  public async execute(deckId: number): Promise<FlashcardEntity[]> {
    return await this.flashcard.findAll(deckId);
  }
}
