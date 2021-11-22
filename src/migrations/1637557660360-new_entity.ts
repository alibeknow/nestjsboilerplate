import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637557660360 implements MigrationInterface {
    name = 'newEntity1637557660360'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "contract_number" character varying`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "date_sign" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "date_sign"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "contract_number"`);
    }

}
