import {MigrationInterface, QueryRunner} from "typeorm";

export class addIbanFieldCompany1628512209655 implements MigrationInterface {
    name = 'addIbanFieldCompany1628512209655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "bin"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "bin" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "bin"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "bin" integer NOT NULL`);
    }

}
