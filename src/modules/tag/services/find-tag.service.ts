import { Inject, Injectable } from '@nestjs/common';
import { TagEntity } from '../domain/entities/tag.entity';
import { ITagRepository } from '../domain/repositories/tag.repository';
import { TagRepository } from '../infra/repositories/typeorm/tag.repository';

@Injectable()
export class FindAllTagService {
  constructor(
    @Inject(TagRepository) private readonly tag: ITagRepository,
  ) {}

  public async execute(): Promise<TagEntity[]> {
    return await this.tag.findAll();
  }
}
