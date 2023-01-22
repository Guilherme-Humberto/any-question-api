import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Envs } from '@shared/envs/envs';
import * as session from 'express-session';
import * as passport from 'passport';
import { globalPipesConfig, passportSessionConfig } from '@configs/geral';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(session(passportSessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe(globalPipesConfig));

  await app.listen(Envs.PORT, () => {
    console.log(`API is running on port ${Envs.PORT}`);
  });
}
bootstrap();
