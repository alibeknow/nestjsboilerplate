import type { MigrationInterface, QueryRunner } from 'typeorm';

export class newEntity1636607276726 implements MigrationInterface {
  name = 'newEntity1636607276726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "accounts" ADD CONSTRAINT "UQ_9a4b004902294416b096e7556e3" UNIQUE ("iban")',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "accounts" DROP CONSTRAINT "UQ_9a4b004902294416b096e7556e3"',
    );
  }
}
