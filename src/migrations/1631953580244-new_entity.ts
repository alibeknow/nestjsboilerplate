import type { MigrationInterface, QueryRunner } from 'typeorm';

export class newEntity1631953580244 implements MigrationInterface {
  name = 'newEntity1631953580244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "signature" ADD "fio" character varying',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "signature" DROP COLUMN "fio"');
  }
}
