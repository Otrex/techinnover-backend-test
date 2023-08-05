import 'reflect-metadata';
import { AppDataSource } from './database/connection';
import { runSeeders } from 'typeorm-extension';
import app from './app';
import config from './config';

(async () => {
  const dataSource = await AppDataSource.initialize();
  await runSeeders(dataSource);
  app.listen(config.app.port, () => {
    console.log(`\u{2708} - Server listening on port: ${config.app.port}`);
  });
})().catch(console.error);
