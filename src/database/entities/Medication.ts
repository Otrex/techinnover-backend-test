import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Medication {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ nullable: false  })
  name: string;

  @Column({ nullable: false, type: "float" })
  weight: number

  @Column()
  code: string

  @Column()
  image: string
}
