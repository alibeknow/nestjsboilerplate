import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1636699385156 implements MigrationInterface {
    name = 'newEntity1636699385156'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" ADD "company_id" uuid`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_e981b79d9e3a19671de5648f4a0" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_e981b79d9e3a19671de5648f4a0"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "company_id"`);
    }

}
