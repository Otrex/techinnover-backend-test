import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drone } from './Drone.entity';
import { Medication } from './Medication.entity';

@Entity()
export class DroneMedication {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Drone, (drone) => drone.id)
  @JoinColumn({ name: 'drone_id' })
  drone: Drone;

  @ManyToOne(() => Medication, (medication) => medication.id)
  @JoinColumn({ name: 'medication_id' })
  medication: Medication;

  @Column({ default: 0, type: "int" })
  quantity: number;
}
