import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637148523223 implements MigrationInterface {
    name = 'newEntity1637148523223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "asset" character varying`);
        await queryRunner.query(`ALTER TABLE "companyUsers" ADD "is_main" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "json_data"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "json_data" jsonb array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "json_data"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "json_data" jsonb`);
        await queryRunner.query(`ALTER TABLE "companyUsers" DROP COLUMN "is_main"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "asset"`);
    }

}
