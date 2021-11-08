import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1636387570480 implements MigrationInterface {
    name = 'newEntity1636387570480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "is_main" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "is_main" DROP DEFAULT`);
    }

}
