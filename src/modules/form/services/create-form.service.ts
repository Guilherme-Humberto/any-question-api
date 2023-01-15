import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUserRepository } from '@modules/user/domain/repositories/user.repository';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { FormEntity } from '../domain/entities/form.entity';
import { IFormRepository } from '../domain/repositories/form.repository';
import { CreateFormDto } from '../dto/create-form.dto';
import { FormRepository } from '../infra/repositories/typeorm/form.repository';

@Injectable()
export class CreateFormService {
  constructor(
    @Inject(FormRepository) private readonly form: IFormRepository,
    @Inject(UserRepository) private readonly user: IUserRepository,
  ) {}

  public async execute(data: CreateFormDto): Promise<FormEntity> {
    const form = await this.form.findOneForm({ title: data.title });
    const user = await this.user.findById(data.user_id);

    if (!user) throw new NotFoundException('User not found');
    if (form) throw new BadRequestException('Form already exists');

    return await this.form.create(data);
  }
}
