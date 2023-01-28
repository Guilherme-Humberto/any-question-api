import { Envs } from '@shared/envs/envs';

export const corsOptions = {
  origin: Envs.FRONTEND_URL,
  credentials: true,
};

export const passportSessionConfig = {
  secret: Envs.SECRET_TOKEN,
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: Envs.COOKIE_MAXAGE, secure: true },
};

export const globalPipesConfig = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};
