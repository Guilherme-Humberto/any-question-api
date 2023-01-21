import { connection } from '@configs/database/database.config';
import { DeckModule } from '@modules/deck/deck.module';
import { DeckEntity } from '@modules/deck/domain/entities/deck.entity';
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
      entities: [UserEntity, DeckEntity],
    }),
    UserModule,
    DeckModule
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
