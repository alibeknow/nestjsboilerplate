import {MigrationInterface, QueryRunner} from "typeorm";

export class changeDocModel1627482240397 implements MigrationInterface {
    name = 'changeDocModel1627482240397'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" ADD "body" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "body"`);
    }

}
