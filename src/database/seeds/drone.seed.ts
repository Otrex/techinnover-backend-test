import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Drone } from '../entities/Drone.entity';

export default class DroneSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const DroneFactory = await factoryManager.get(Drone);
    await DroneFactory.saveMany(10);
  }
}
