import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import { Envs } from '@shared/envs/envs';
import * as config from '@configs/global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cors(config.corsOptions));
  app.use(cookieParser());
  app.use(session(config.passportSessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(new ValidationPipe(config.globalPipesConfig));

  await app.listen(Envs.PORT, () => {
    console.log(`API is running on port ${Envs.PORT}`);
  });
}
bootstrap();
