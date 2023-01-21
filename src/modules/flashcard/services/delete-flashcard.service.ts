import { Inject, Injectable } from '@nestjs/common';
import { FlashcardEntity } from '../domain/entities/flashcard.entity';
import { IFlashcardRepository } from '../domain/repositories/flashcard.repository';
import { FlashcardRepository } from '../infra/repositories/typeorm/flashcard.repository';

@Injectable()
export class DeleteFlashcardService {
  constructor(
    @Inject(FlashcardRepository) private readonly flashcard: IFlashcardRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.flashcard.delete(id);
  }
}
