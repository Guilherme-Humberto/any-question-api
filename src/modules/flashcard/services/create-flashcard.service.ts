import {
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FlashcardEntity } from '../domain/entities/flashcard.entity';
import { IFlashcardRepository } from '../domain/repositories/flashcard.repository';
import { CreateFlashcardDto } from '../dto/create-flashcard.dto';
import { FlashcardRepository } from '../infra/repositories/typeorm/flashcard.repository';
import { DeckRepository } from '@modules/deck/infra/repositories/typeorm/deck.repository';
import { IDeckRepository } from '@modules/deck/domain/repositories/deck.repository';

@Injectable()
export class CreateFlashcardService {
  constructor(
    @Inject(FlashcardRepository) private readonly flashcard: IFlashcardRepository,
    @Inject(DeckRepository) private readonly deck: IDeckRepository,
  ) {}

  public async execute(data: CreateFlashcardDto): Promise<FlashcardEntity> {
    const deck = await this.deck.findOne({ id: data.deck });
    if (!deck) throw new NotFoundException('Deck not found');

    return await this.flashcard.create(data);
  }
}
