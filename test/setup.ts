import { AppDataSource } from '@/database/connection';
import { Documentation } from '@obisiket1/express-utils';
import { runSeeders } from 'typeorm-extension';
import { join } from 'path';

export const documentation = new Documentation({
  title: 'Dispatcher',
  filePaths: join(__dirname, '..', 'docs', 'api.json'),
});

export const mochaHooks = {
  async beforeAll(): Promise<void> {
    const dataSource = await AppDataSource.initialize();
    await runSeeders(dataSource);
  },

  async afterAll(): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    documentation.renderDocumentation();
  },
};
