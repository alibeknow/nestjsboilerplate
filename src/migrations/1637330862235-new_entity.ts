import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637330862235 implements MigrationInterface {
    name = 'newEntity1637330862235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "enable_resign" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "enable_resign"`);
    }

}
