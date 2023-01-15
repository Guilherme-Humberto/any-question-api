import { CreateFormDto } from '@modules/form/dto/create-form.dto';
import { UpdateFormDto } from '@modules/form/dto/update-form.dto';
import { FormEntity } from '../entities/form.entity';

export interface IFormRepository {
  create(data: CreateFormDto): Promise<FormEntity>;
  update(data: UpdateFormDto): Promise<FormEntity>;
  delete(id: number): Promise<void>;
  findAll(): Promise<FormEntity[]>;
  findOneForm(where: object): Promise<FormEntity>;
}
