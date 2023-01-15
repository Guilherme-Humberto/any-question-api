import { ExampleEntity } from '@modules/example/domain/entities/example.entity';
import { IExampleRepository } from '@modules/example/domain/repositories/example.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExampleRepository implements IExampleRepository {
  constructor(
    @InjectRepository(ExampleEntity)
    private readonly repository: Repository<ExampleEntity>,
  ) {}

  async create(data: ExampleEntity): Promise<ExampleEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(id: number, data: ExampleEntity): Promise<ExampleEntity> {
    const findIfExists = await this.repository.findOne({ where: { id } });

    if (!findIfExists) throw new NotFoundException('Example no found');
    const response = await this.repository.save(data);
    return response;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async findAll(): Promise<ExampleEntity[]> {
    return await this.repository.find();
  }
}
