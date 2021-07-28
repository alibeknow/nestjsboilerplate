import {MigrationInterface, QueryRunner} from "typeorm";

export class companies1627485078163 implements MigrationInterface {
    name = 'companies1627485078163'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "documents_status_enum" AS ENUM('PENDING', 'DECLINE', 'SIGNED')`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "status" "documents_status_enum" NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "documents_status_enum"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "status" character varying`);
    }

}
