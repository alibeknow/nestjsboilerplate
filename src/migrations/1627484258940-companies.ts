import {MigrationInterface, QueryRunner} from "typeorm";

export class companies1627484258940 implements MigrationInterface {
    name = 'companies1627484258940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "bin" character varying, "is_active" boolean, CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "documents" ADD "author_id" uuid`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_85d4e65f38815d121b87e9ed7aa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_85d4e65f38815d121b87e9ed7aa"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP COLUMN "author_id"`);
        await queryRunner.query(`DROP TABLE "companies"`);
    }

}
