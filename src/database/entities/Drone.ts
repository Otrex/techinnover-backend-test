import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { DroneModel, DroneState } from "../enum";

@Entity()
export class Drone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false  })
  serialNumber: string;

  @Column({ type: "integer", default: 0})
  batteryLevel: number;

  @Column({ type: "float", default: 500.0 })
  weightLimit: boolean

  @Column({ type: "enum", enum: DroneState, default: DroneState.IDLE })
  state: DroneState

  @Column({ type: "enum", enum: DroneState, nullable: false })
  model: DroneModel

  @Column()
  isActive: boolean
}
