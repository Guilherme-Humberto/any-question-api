import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Envs } from '@shared/envs/envs';

export const connection: TypeOrmModuleOptions = {
  type: 'mysql',
  host: Envs.MYSQL_HOST,
  port: Envs.MYSQL_PORT,
  username: Envs.MYSQL_USERNAME,
  password: Envs.MYSQL_PASSWORD,
  database: Envs.MYSQL_DATABASE,
  synchronize: true,
};
