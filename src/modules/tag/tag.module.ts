import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';
import { FlashcardRepository } from '@modules/flashcard/infra/repositories/typeorm/flashcard.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './domain/entities/tag.entity';
import { TagController } from './infra/http/controllers/tag.controller';
import { TagRepository } from './infra/repositories/typeorm/tag.repository';
import { CreateTagService } from './services/create-tag.service';
import { DeleteTagService } from './services/delete-tag.service';
import { FindAllTagService } from './services/find-tag.service';
import { UpdateTagService } from './services/update-tag.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity, FlashcardEntity])],
  controllers: [TagController],
  providers: [
    TagRepository,
    FlashcardRepository,
    CreateTagService,
    UpdateTagService,
    FindAllTagService,
    DeleteTagService,
  ],
})
export class TagModule {}
