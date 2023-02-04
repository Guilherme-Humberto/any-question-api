import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FlashcardEntity } from '../domain/entities/flashcard.entity';
import { IFlashcardRepository } from '../domain/repositories/flashcard.repository';
import { UpdateFlashcardDto } from '../dto/update-flashcard.dto';
import { FlashcardRepository } from '../infra/repositories/typeorm/flashcard.repository';

@Injectable()
export class UpdateFlashcardService {
  constructor(
    @Inject(FlashcardRepository)
    private readonly flashcard: IFlashcardRepository,
  ) {}

  public async execute(
    id: number,
    deckId: number,
    data: UpdateFlashcardDto,
  ): Promise<FlashcardEntity> {
    const oldFlashcard = await this.flashcard.findOne({ id, deck: deckId });

    if (!oldFlashcard) throw new NotFoundException('Flashcard not found');

    const newUser = Object.assign(oldFlashcard, data);

    return await this.flashcard.update(newUser);
  }
}
