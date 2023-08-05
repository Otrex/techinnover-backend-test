import dotenv from 'dotenv';
import { join } from 'path';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { SeederOptions } from 'typeorm-extension';
dotenv.config({
  path: process.env.APP_ENV !== 'production'
    ? join(__dirname, '..', '.env.dev')
    : join(__dirname, '..', '.env'),
})

type Config = {
  app: Record<string, any>;
  database: SqliteConnectionOptions & SeederOptions;
};

const config: Config = {
  app: {
    name: process.env.APP_NAME!,
    port: +(process.env.PORT || 3000),
    env: process.env.APP_ENV! || 'development',
    staticFilePath: join(__dirname, '..', 'static'),
    apiDocs: join(__dirname, '..', 'docs', 'api.json'),
  },
  database: {
    type: 'sqlite',
    database: join(
      __dirname,
      'database',
      process.env.APP_ENV !== 'test' ? process.env.DB || 'data.sqlite' : process.env.TEST_DB || 'data.test.sqlite'
    ),
    seeds: [__dirname + '/**/seeds/*.seed{.ts,.js}'],
    factories: [__dirname + '/**/seeds/*.factory{.ts,.js}'],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
    synchronize: true,
  },
};

export default config;
