import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637081814724 implements MigrationInterface {
    name = 'newEntity1637081814724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "json_data"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "json_data" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "json_data"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "json_data" json`);
    }

}
