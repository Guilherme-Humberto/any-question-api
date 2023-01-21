import { CreateTagDto } from '@modules/tag/dto/create-tag.dto';
import { UpdateTagDto } from '@modules/tag/dto/update-tag.dto';
import { TagEntity } from '../entities/tag.entity';

export interface ITagRepository {
  create(data: CreateTagDto): Promise<TagEntity>;
  update(data: UpdateTagDto): Promise<TagEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<TagEntity[]>;
  findOne(where: object): Promise<TagEntity>;
}
