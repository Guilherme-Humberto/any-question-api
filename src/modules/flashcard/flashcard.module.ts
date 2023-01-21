import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { DeckRepository } from '@modules/deck/infra/repositories/typeorm/deck.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashcardEntity } from './domain/entities/flashcard.entity';
import { FlashcardController } from './infra/http/controllers/flashcard.controller';
import { FlashcardRepository } from './infra/repositories/typeorm/flashcard.repository';
import { CreateFlashcardService } from './services/create-flashcard.service';
import { DeleteFlashcardService } from './services/delete-flashcard.service';
import { FindAllFlashcardService } from './services/find-flashcard.service';
import { UpdateFlashcardService } from './services/update-flashcard.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlashcardEntity, DeckEntity])],
  controllers: [FlashcardController],
  providers: [
    FlashcardRepository,
    DeckRepository,
    CreateFlashcardService,
    UpdateFlashcardService,
    FindAllFlashcardService,
    DeleteFlashcardService,
  ],
})
export class FlashcardModule {}
