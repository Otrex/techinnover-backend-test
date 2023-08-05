import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DroneModel, DroneState } from '../enum';
import { LoadedDrone } from './LoadedDrone.entity';

@Entity()
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, nullable: false })
  serialNumber: string;

  @Column({ type: 'float', default: 500.0 })
  weightLimit: boolean;

  @Column({ default: DroneState.IDLE })
  state: DroneState;

  @Column({ nullable: false })
  model: DroneModel;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'int', default: 100 })
  batteryCapacity: number;

  @OneToMany(() => LoadedDrone, (loaded) => loaded.medications)
  load: LoadedDrone[];
}
