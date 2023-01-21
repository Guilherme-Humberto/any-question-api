import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TagEntity } from '../domain/entities/tag.entity';
import { ITagRepository } from '../domain/repositories/tag.repository';
import { CreateTagDto } from '../dto/create-tag.dto';
import { TagRepository } from '../infra/repositories/typeorm/tag.repository';
import { FlashcardRepository } from '@modules/flashcard/infra/repositories/typeorm/flashcard.repository';
import { IFlashcardRepository } from '@modules/flashcard/domain/repositories/flashcard.repository';

@Injectable()
export class CreateTagService {
  constructor(
    @Inject(TagRepository) private readonly tag: ITagRepository,
    @Inject(FlashcardRepository) private readonly flashcard: IFlashcardRepository,
  ) {}

  public async execute(data: CreateTagDto): Promise<TagEntity> {
    const tag = await this.tag.findOne({ title: data.title });
    const flashcard = await this.flashcard.findOne({ id: data.flashcard });

    if (!flashcard) throw new NotFoundException('Flashcard not found');
    if (tag) throw new BadRequestException('Tag already exists');

    return await this.tag.create(data);
  }
}
