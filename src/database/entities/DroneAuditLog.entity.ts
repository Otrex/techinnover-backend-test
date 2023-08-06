import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Drone } from './Drone.entity';

@Entity()
export class DroneAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Drone, (drone) => drone.id)
  @JoinColumn({ name: 'drone_id' })
  drone: Drone;

  @Column({ type: 'int', default: 100 })
  batteryLevel: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
