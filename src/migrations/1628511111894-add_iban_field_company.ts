import {MigrationInterface, QueryRunner} from "typeorm";

export class addIbanFieldCompany1628511111894 implements MigrationInterface {
    name = 'addIbanFieldCompany1628511111894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ADD "iban" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "bin"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "bin" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "is_active" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "is_active" SET DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "is_active" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "is_active" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "bin"`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "bin" character varying`);
        await queryRunner.query(`ALTER TABLE "companies" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "iban"`);
    }

}
