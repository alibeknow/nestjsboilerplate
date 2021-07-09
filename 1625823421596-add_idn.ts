import {MigrationInterface, QueryRunner} from "typeorm";

export class addIdn1625823421596 implements MigrationInterface {
    name = 'addIdn1625823421596'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "middle_name" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "idn" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "idn"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "middle_name"`);
    }

}
