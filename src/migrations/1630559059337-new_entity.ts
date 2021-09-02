import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1630559059337 implements MigrationInterface {
    name = 'newEntity1630559059337'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "companies_company_type_enum" AS ENUM('ИП', 'ТОО', 'АО')`);
        await queryRunner.query(`ALTER TABLE "companies" ADD "company_type" "companies_company_type_enum" NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "company_type"`);
        await queryRunner.query(`DROP TYPE "companies_company_type_enum"`);
    }

}
