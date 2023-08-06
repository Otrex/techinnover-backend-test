import 'reflect-metadata';
import { AppDataSource } from './database/connection';
import { runSeeders } from 'typeorm-extension';
import app from './app';
import config from './config';
import { cron } from './cron';


(async () => {
  const dataSource = await AppDataSource.initialize();
  console.log("- Database connected");
  
  await runSeeders(dataSource);
  console.log("- Seeding successful")

  cron.start();

  app.listen(config.app.port, () => {
    console.log(`- Server on port: ${config.app.port}`);
  });
})().catch(console.error);
