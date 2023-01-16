import { connection } from '@configs/database/database.config';
import { AnswerModule } from '@modules/answer/answer.module';
import { AnswerEntity } from '@modules/answer/domain/entities/answer.entity';
import { FormEntity } from '@modules/form/domain/entities/form.entity';
import { FormModule } from '@modules/form/form.module';
import { QuestionEntity } from '@modules/question/domain/entities/question.entity';
import { QuestionModule } from '@modules/question/question.module';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserModule } from '@modules/user/user.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@shared/middlewares/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connection,
      entities: [UserEntity, FormEntity, QuestionEntity, AnswerEntity],
    }),
    UserModule,
    FormModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude({
      path: '/healhCheck',
      method: RequestMethod.GET,
    });
  }
}
