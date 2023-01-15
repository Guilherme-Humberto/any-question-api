import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FormEntity } from '../domain/entities/form.entity';
import { IFormRepository } from '../domain/repositories/form.repository';
import { UpdateFormDto } from '../dto/update-form.dto';
import { FormRepository } from '../infra/repositories/typeorm/form.repository';

@Injectable()
export class UpdateFormService {
  constructor(@Inject(FormRepository) private readonly form: IFormRepository) {}

  public async execute(id: number, data: UpdateFormDto): Promise<FormEntity> {
    const oldForm = await this.form.findOneForm({ form_id: id });

    if (!oldForm) throw new NotFoundException('Form not found');

    const newUser = Object.assign(oldForm, data);

    return await this.form.update(newUser);
  }
}
