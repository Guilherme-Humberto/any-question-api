import { Inject, Injectable } from '@nestjs/common';
import { ExampleEntity } from '../domain/entities/example.entity';
import { IExampleRepository } from '../domain/repositories/example.repository';
import { ExampleRepository } from '../infra/repositories/typeorm/example.repository';

@Injectable()
export class DeleteExampleService {
  constructor(
    @Inject(ExampleRepository) private readonly example: IExampleRepository,
  ) {}

  public async execute(id: number): Promise<void> {
    await this.example.delete(id);
  }
}
