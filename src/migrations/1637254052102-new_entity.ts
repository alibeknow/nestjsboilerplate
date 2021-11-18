import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637254052102 implements MigrationInterface {
    name = 'newEntity1637254052102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "path" character varying NOT NULL, "document_id" uuid, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_d443ff8fa4ea21a53982174011b" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_d443ff8fa4ea21a53982174011b"`);
        await queryRunner.query(`DROP TABLE "assets"`);
    }

}
