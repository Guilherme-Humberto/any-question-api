import { Inject, Injectable } from '@nestjs/common';
import { FormEntity } from '../domain/entities/form.entity';
import { IFormRepository } from '../domain/repositories/form.repository';
import { FormRepository } from '../infra/repositories/typeorm/form.repository';

@Injectable()
export class FindAllFormService {
  constructor(
    @Inject(FormRepository) private readonly form: IFormRepository,
  ) {}

  public async execute(): Promise<FormEntity[]> {
    return await this.form.findAll();
  }
}
