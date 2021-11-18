import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1637255203766 implements MigrationInterface {
    name = 'newEntity1637255203766'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assets" ADD "mime_type" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assets" DROP COLUMN "mime_type"`);
    }

}
