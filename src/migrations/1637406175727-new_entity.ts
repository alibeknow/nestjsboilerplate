import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637406175727 implements MigrationInterface {
    name = 'newEntity1637406175727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "enable_resign" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ALTER COLUMN "enable_resign" DROP DEFAULT`);
    }

}
