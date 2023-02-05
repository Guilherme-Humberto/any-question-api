import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';
import { IFlashcardRepository } from '@modules/flashcard/domain/repositories/flashcard.repository';
import { CreateFlashcardDto } from '@modules/flashcard/dto/create-flashcard.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FlashcardRepository implements IFlashcardRepository {
  constructor(
    @InjectRepository(FlashcardEntity)
    private readonly repository: Repository<FlashcardEntity>,
  ) {}

  async create(data: CreateFlashcardDto): Promise<FlashcardEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: FlashcardEntity): Promise<FlashcardEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(id: number, deckId: number): Promise<void> {
    await this.repository.delete({
      id,
      deck: { id: deckId },
    });
  }

  async findAll(deckId: number): Promise<FlashcardEntity[]> {
    return await this.repository.find({
      where: { deck: { id: deckId } },
      relations: ['deck', 'tags'],
    });
  }

  async findOne(parameter: object): Promise<FlashcardEntity> {
    return await this.repository.findOne({ where: parameter });
  }
}
