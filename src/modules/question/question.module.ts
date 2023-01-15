import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionEntity } from './domain/entities/question.entity';
import { QuestionController } from './infra/http/controllers/question.controller';
import { QuestionRepository } from './infra/repositories/typeorm/question.repository';
import { CreateQuestionService } from './services/create-question.service';
import { DeleteQuestionService } from './services/delete-question.service';
import { FindAllQuestionService } from './services/find-question.service';
import { UpdateQuestionService } from './services/update-question.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [QuestionController],
  providers: [
    QuestionRepository,
    CreateQuestionService,
    UpdateQuestionService,
    FindAllQuestionService,
    DeleteQuestionService,
  ],
})
export class QuestionModule {}
