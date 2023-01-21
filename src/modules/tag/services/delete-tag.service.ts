import { Inject, Injectable } from '@nestjs/common';
import { ITagRepository } from '../domain/repositories/tag.repository';
import { TagRepository } from '../infra/repositories/typeorm/tag.repository';

@Injectable()
export class DeleteTagService {
  constructor(
    @Inject(TagRepository) private readonly tag: ITagRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.tag.delete(id);
  }
}
