import { connection } from '@configs/database/database.config';
import { AuthModule } from '@modules/auth/auth.module';
import { DeckModule } from '@modules/deck/deck.module';
import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
import { FlashcardEntity } from '@modules/flashcard/domain/entities/flashcard.entity';
import { FlashcardModule } from '@modules/flashcard/flashcard.module';
import { TagEntity } from '@modules/tag/domain/entities/tag.entity';
import { TagModule } from '@modules/tag/tag.module';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserModule } from '@modules/user/user.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@shared/middlewares/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...connection,
      entities: [UserEntity, DeckEntity, FlashcardEntity, TagEntity],
    }),
    UserModule,
    DeckModule,
    FlashcardModule,
    TagModule,
    AuthModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: '/healhCheck',
        method: RequestMethod.GET,
      })
      .forRoutes('deck');
  }
}
