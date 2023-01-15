import { connection } from '@configs/database/database.config';
import { ExampleEntity } from '@modules/example/domain/entities/example.entity';
import { ExampleModule } from '@modules/example/example.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '@shared/middlewares/auth.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   ...connection,
    //   entities: [ExampleEntity],
    // }),
    // ExampleModule,
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
