import type { MigrationInterface, QueryRunner } from 'typeorm';

export class newEntity1629458748817 implements MigrationInterface {
  name = 'newEntity1629458748817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'INSERT INTO public.users(created_at, updated_at, first_name, last_name, middle_name, role, idn, company_id, email, password) VALUES (NOW(), NOW(), "ALIBEK", "ALIBEK", "ALIBEK", "ADMIN", "910331301246", null, "myEMAIL", null);',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "email" character varying',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD "password" character varying',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "password"');
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"',
    );
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "email"');
  }
}
