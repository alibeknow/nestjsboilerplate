import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637072952085 implements MigrationInterface {
    name = 'newEntity1637072952085'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companyUsers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "middle_name" character varying, "email" character varying, "position" character varying, "operator_doc" character varying, CONSTRAINT "UQ_e9ff3d9b2503e65abb4261fc13a" UNIQUE ("email"), CONSTRAINT "PK_7cfc97d041e6e8eb2d5a4009d5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "comments" text`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "json_data" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "json_data"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "comments"`);
        await queryRunner.query(`DROP TABLE "companyUsers"`);
    }

}
