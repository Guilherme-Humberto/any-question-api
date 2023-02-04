import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { IDeckRepository } from '@modules/deck/domain/repositories/deck.repository';
import { CreateDeckDto } from '@modules/deck/dto/create-deck.dto';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { REQUEST } from '@nestjs/core';
import { CustomRequest } from '@shared/interfaces';
import { UpdateDeckDto } from '@modules/deck/dto/update-deck.dto';

@Injectable({ scope: Scope.REQUEST })
export class DeckRepository implements IDeckRepository {
  constructor(
    @Inject(REQUEST) private readonly request: CustomRequest,
    @InjectRepository(DeckEntity)
    private readonly repository: Repository<DeckEntity>,
  ) {}

  async create(data: CreateDeckDto): Promise<DeckEntity> {
    const response = this.repository.create({
      ...data,
      user: { id: data.user },
    });
    await this.repository.save(response);

    return response;
  }
  async update(data: UpdateDeckDto): Promise<void> {
    await this.repository.save({
      ...data,
      user: { id: data.user },
    });
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(
    options: IPaginationOptions,
  ): Promise<Pagination<DeckEntity> | DeckEntity[]> {
    if (options.page && options.limit) {
      return paginate<DeckEntity>(this.repository, options, {
        where: { user: { id: this.request.user.id } },
        relations: ['flashcards'],
      });
    }

    return await this.repository.find({
      where: { user: { id: this.request.user.id } },
      relations: ['flashcards'],
    });
  }

  async findOne(where: object): Promise<DeckEntity> {
    return await this.repository.findOne({ where, relations: ['flashcards'] });
  }
}
