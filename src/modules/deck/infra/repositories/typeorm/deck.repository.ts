import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { IDeckRepository } from '@modules/deck/domain/repositories/deck.repository';
import { CreateDeckDto } from '@modules/deck/dto/create-deck.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DeckRepository implements IDeckRepository {
  constructor(
    @InjectRepository(DeckEntity)
    private readonly repository: Repository<DeckEntity>,
  ) {}

  async create(data: CreateDeckDto): Promise<DeckEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: DeckEntity): Promise<DeckEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<DeckEntity[]> {
    return await this.repository.find({
      relations: ['user']
    });
  }

  async findOne(where: object): Promise<DeckEntity> {
    return await this.repository.findOne({ where });
  }
}
