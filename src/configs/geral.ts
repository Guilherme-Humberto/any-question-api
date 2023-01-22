import { Envs } from '@shared/envs/envs';

export const passportSessionConfig = {
  secret: Envs.SECRET_TOKEN,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 86400000 },
};

export const globalPipesConfig = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};
