import { TagEntity } from '@modules/tag/domain/entities/tag.entity';
import { ITagRepository } from '@modules/tag/domain/repositories/tag.repository';
import { CreateTagDto } from '@modules/tag/dto/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagRepository implements ITagRepository {
  constructor(
    @InjectRepository(TagEntity)
    private readonly repository: Repository<TagEntity>,
  ) {}

  async create(data: CreateTagDto): Promise<TagEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: TagEntity): Promise<TagEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(id: number, flashcardId: number): Promise<void> {
    await this.repository.delete({
      id,
      flashcard: flashcardId,
    });
  }

  async findAll(): Promise<TagEntity[]> {
    return await this.repository.find({
      relations: ['flashcard'],
    });
  }

  async findOne(where: object): Promise<TagEntity> {
    return await this.repository.findOne({ where });
  }
}
