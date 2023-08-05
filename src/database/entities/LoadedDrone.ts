import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Drone } from "./Drone";
import { Medication } from "./Medication";

@Entity()
export class LoadedDrone {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Drone, (drone) => drone.id)
  drone: Drone;

  @ManyToMany(() => Medication, (medication) => medication.id)
  medications: Medication[]
}
