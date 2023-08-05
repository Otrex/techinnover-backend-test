import "reflect-metadata"
import { AppDataSource } from "./database/connection"
import app from "./app";
import config from "./config";


(async () => {
  await AppDataSource.initialize();
  app.listen(config.app.port, () => {
    console.log(`\u{2708} - Server listening on port: ${config.app.port}`);
  })
})().catch(console.error)