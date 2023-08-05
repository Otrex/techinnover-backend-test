import { join } from "path";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

type Config = {
  app: Record<string, any>;
  database: SqliteConnectionOptions;
}

const config: Config = {
  app: {
    name: process.env.APP_NAME!,
    port: +(process.env.PORT || 3000),
    env: process.env.APP_ENV! || "development",
    staticFilePath: join(__dirname, "..", "static"),
  },
  database: {
    type :"sqlite",
    database: join(__dirname, "database", "data.sqlite"),
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true
  }
}

export default config;