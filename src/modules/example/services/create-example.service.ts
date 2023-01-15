import { Inject, Injectable } from '@nestjs/common';
import { ExampleEntity } from '../domain/entities/example.entity';
import { IExampleRepository } from '../domain/repositories/example.repository';
import { CreateExampleDto } from '../dto/create-example.dto';
import { ExampleRepository } from '../infra/repositories/typeorm/example.repository';

@Injectable()
export class CreateExampleService {
  constructor(
    @Inject(ExampleRepository) private readonly example: IExampleRepository,
  ) {}

  public async execute(data: CreateExampleDto): Promise<ExampleEntity> {
    const response = await this.example.create(data);
    return response;
  }
}
