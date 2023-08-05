import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1691269931178 implements MigrationInterface {
  name = 'Init1691269931178';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "drone" ("id" varchar PRIMARY KEY NOT NULL, "serialNumber" varchar(100) NOT NULL, "batteryLevel" integer NOT NULL DEFAULT (0), "weightLimit" float NOT NULL DEFAULT (500), "state" varchar NOT NULL DEFAULT ('IDLE'), "model" varchar NOT NULL, "isActive" boolean NOT NULL, "batteryCapacity" integer NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "medication" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "weight" float NOT NULL, "code" varchar NOT NULL, "image" varchar NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "loaded_drone" ("id" varchar PRIMARY KEY NOT NULL, "droneId" varchar, "medicationsId" varchar)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_loaded_drone" ("id" varchar PRIMARY KEY NOT NULL, "droneId" varchar, "medicationsId" varchar, CONSTRAINT "FK_f2d9cdfa9d94684b6e3150e7f40" FOREIGN KEY ("droneId") REFERENCES "drone" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3e025af1da53c8239f3c9841823" FOREIGN KEY ("medicationsId") REFERENCES "medication" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_loaded_drone"("id", "droneId", "medicationsId") SELECT "id", "droneId", "medicationsId" FROM "loaded_drone"`
    );
    await queryRunner.query(`DROP TABLE "loaded_drone"`);
    await queryRunner.query(`ALTER TABLE "temporary_loaded_drone" RENAME TO "loaded_drone"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "loaded_drone" RENAME TO "temporary_loaded_drone"`);
    await queryRunner.query(
      `CREATE TABLE "loaded_drone" ("id" varchar PRIMARY KEY NOT NULL, "droneId" varchar, "medicationsId" varchar)`
    );
    await queryRunner.query(
      `INSERT INTO "loaded_drone"("id", "droneId", "medicationsId") SELECT "id", "droneId", "medicationsId" FROM "temporary_loaded_drone"`
    );
    await queryRunner.query(`DROP TABLE "temporary_loaded_drone"`);
    await queryRunner.query(`DROP TABLE "loaded_drone"`);
    await queryRunner.query(`DROP TABLE "medication"`);
    await queryRunner.query(`DROP TABLE "drone"`);
  }
}
