import {MigrationInterface, QueryRunner} from "typeorm";

export class createOrphanage1602801306705 implements MigrationInterface {
    name = 'createOrphanage1602801306705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orphanages" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "latitude" decimal(10,2), "longitude" decimal(10,2), "about" varchar, "instructions" varchar, "open_on_weekends" boolean DEFAULT (0), "opening_hours" varchar, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orphanages"`);
    }

}
