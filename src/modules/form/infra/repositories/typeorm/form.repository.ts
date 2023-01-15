import { FormEntity } from '@modules/form/domain/entities/form.entity';
import { IFormRepository } from '@modules/form/domain/repositories/form.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormRepository implements IFormRepository {
  constructor(
    @InjectRepository(FormEntity)
    private readonly repository: Repository<FormEntity>,
  ) {}

  async create(data: FormEntity): Promise<FormEntity> {
    const response = this.repository.create(data);
    await this.repository.save(response);

    return response;
  }
  async update(data: FormEntity): Promise<FormEntity> {
    await this.repository.save(data);
    return data;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<FormEntity[]> {
    return await this.repository.find({
      relations: ['user_id'],
    });
  }

  async findOneForm(where: object): Promise<FormEntity> {
    return await this.repository.findOne({ where });
  }
}
