import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Envs } from '@shared/envs/envs';
import { globalPipesConfig, passportSessionConfig } from '@configs/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors());
  app.use(session(passportSessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe(globalPipesConfig));

  await app.listen(Envs.PORT, () => {
    console.log(`API is running on port ${Envs.PORT}`);
  });
}
bootstrap();
