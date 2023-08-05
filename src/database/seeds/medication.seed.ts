import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Medication } from '../entities/Medication.entity';

export default class MedicationSeeder implements Seeder {
  public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    const medicationFactory = await factoryManager.get(Medication);
    await medicationFactory.saveMany(10);
  }
}
