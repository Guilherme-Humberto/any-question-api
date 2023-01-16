import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerEntity } from './domain/entities/answer.entity';
import { AnswerController } from './infra/http/controllers/answer.controller';
import { AnswerRepository } from './infra/repositories/typeorm/answer.repository';
import { CreateAnswerService } from './services/create-answer.service';
import { DeleteAnswerService } from './services/delete-answer.service';
import { FindAllAnswerService } from './services/find-answer.service';
import { UpdateAnswerService } from './services/update-answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity])],
  controllers: [AnswerController],
  providers: [
    AnswerRepository,
    CreateAnswerService,
    UpdateAnswerService,
    FindAllAnswerService,
    DeleteAnswerService,
  ],
})
export class AnswerModule {}
