import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TagEntity } from '../domain/entities/tag.entity';
import { ITagRepository } from '../domain/repositories/tag.repository';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { TagRepository } from '../infra/repositories/typeorm/tag.repository';

@Injectable()
export class UpdateTagService {
  constructor(@Inject(TagRepository) private readonly tag: ITagRepository) {}

  public async execute(id: number, data: UpdateTagDto): Promise<TagEntity> {
    const oldTag = await this.tag.findOne({ id });

    if (!oldTag) throw new NotFoundException('Tag not found');

    const newUser = Object.assign(oldTag, data);

    return await this.tag.update(newUser);
  }
}
