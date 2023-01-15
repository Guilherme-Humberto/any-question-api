import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepository } from '@modules/user/infra/repositories/typeorm/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './domain/entities/form.entity';
import { FormController } from './infra/http/controllers/form.controller';
import { FormRepository } from './infra/repositories/typeorm/form.repository';
import { CreateFormService } from './services/create-form.service';
import { DeleteFormService } from './services/delete-form.service';
import { FindAllFormService } from './services/find-form.service';
import { UpdateFormService } from './services/update-form.service';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity, UserEntity])],
  controllers: [FormController],
  providers: [
    FormRepository,
    UserRepository,
    CreateFormService,
    UpdateFormService,
    FindAllFormService,
    DeleteFormService,
  ],
})
export class FormModule {}
