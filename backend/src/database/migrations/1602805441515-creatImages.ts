import {MigrationInterface, QueryRunner} from "typeorm";

export class creatImages1602805441515 implements MigrationInterface {
    name = 'creatImages1602805441515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "orphanage_id" integer, CONSTRAINT "FK_aa7e04fdd620f748adad5b96bbb" FOREIGN KEY ("orphanage_id") REFERENCES "orphanages" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_images"("id", "path", "orphanage_id") SELECT "id", "path", "orphanage_id" FROM "images"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`ALTER TABLE "temporary_images" RENAME TO "images"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" RENAME TO "temporary_images"`);
        await queryRunner.query(`CREATE TABLE "images" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), "orphanage_id" integer, CONSTRAINT "FK_aa7e04fdd620f748adad5b96bbb" FOREIGN KEY ("orphanage_id") REFERENCES "orphanages" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "images"("id", "path", "orphanage_id") SELECT "id", "path", "orphanage_id" FROM "temporary_images"`);
        await queryRunner.query(`DROP TABLE "temporary_images"`);
    }

}
