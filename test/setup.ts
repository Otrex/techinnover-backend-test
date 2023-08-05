import { AppDataSource } from '@/database/connection';
import { Documentation } from '@obisiket1/express-utils';
import { join } from 'path';

export const documentation = new Documentation({
  title: 'Dispatcher',
  filePaths: join(__dirname, '..', 'docs', 'api.json'),
});

export const mochaHooks = {
  async beforeAll(): Promise<void> {
    await AppDataSource.initialize();
  },

  async afterAll(): Promise<void> {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    documentation.renderDocumentation();
  },
};
