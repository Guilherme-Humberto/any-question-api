import { CreateExampleDto } from '@modules/example/dto/create-example.dto';
import { UpdateExampleDto } from '@modules/example/dto/update-example.dto';
import { ExampleEntity } from '../entities/example.entity';

export interface IExampleRepository {
  create(data: CreateExampleDto): Promise<ExampleEntity>;
  update(id: number, data: UpdateExampleDto): Promise<ExampleEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<ExampleEntity[]>;
}
