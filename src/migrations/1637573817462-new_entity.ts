import type { MigrationInterface, QueryRunner } from 'typeorm';

export class newEntity1637573817462 implements MigrationInterface {
  name = 'newEntity1637573817462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "documents" ADD "doc_number" SERIAL NOT NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "documents" DROP COLUMN "doc_number"');
  }
}
