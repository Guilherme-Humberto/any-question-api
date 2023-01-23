import { Envs } from '@shared/envs/envs';

export const passportSessionConfig = {
  secret: Envs.SECRET_TOKEN,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: Envs.COOKIE_MAXAGE },
};

export const globalPipesConfig = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};
