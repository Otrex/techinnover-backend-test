import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { DroneModel, DroneState } from "../enum";
import { LoadedDrone } from "./LoadedDrone.entity";

@Entity()
export class Drone {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ length: 100, nullable: false  })
  serialNumber: string;

  @Column({ type: "integer", default: 0})
  batteryLevel: number;

  @Column({ type: "float", default: 500.0 })
  weightLimit: boolean;

  @Column({ default: DroneState.IDLE })
  state: DroneState;

  @Column({ nullable: false })
  model: DroneModel;

  @Column()
  isActive: boolean;

  @Column({ type: 'int' })
  batteryCapacity: number;

  @OneToMany(() => LoadedDrone, loaded => loaded.medications)
  load: LoadedDrone[];
}
