import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drone } from './Drone.entity';
import { Medication } from './Medication.entity';

@Entity()
export class LoadedDrone {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Drone, (drone) => drone.id)
  drone: Drone;

  @ManyToOne(() => Medication, (medication) => medication.id)
  medication: Medication;
}
