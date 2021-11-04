import {MigrationInterface, QueryRunner} from "typeorm";

export class newEntity1635945762764 implements MigrationInterface {
    name = 'newEntity1635945762764'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "signature" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "fio" character varying, "is_active" boolean, "body" text NOT NULL, "document_id" uuid, CONSTRAINT "PK_8e62734171afc1d7c9570be27fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."documents_status_enum" AS ENUM('PENDING', 'DECLINE', 'SIGNED', 'APPROVED')`);
        await queryRunner.query(`CREATE TABLE "documents" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "status" "public"."documents_status_enum" NOT NULL DEFAULT 'PENDING', "is_active" boolean, "body" text NOT NULL, "company_id" uuid, CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying, "iban" character varying, "is_main" boolean NOT NULL, "is_active" boolean, "company_id" uuid, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logs" ("id" SERIAL NOT NULL, "context" character varying NOT NULL, "message" text NOT NULL, "level" character varying NOT NULL, "user_id" uuid, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying, "last_name" character varying, "middle_name" character varying, "email" character varying, "password" character varying, "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "idn" character varying, "company_id" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."companies_company_type_enum" AS ENUM('ИП', 'ТОО', 'АО')`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "bin" character varying NOT NULL, "iban" character varying, "is_active" boolean NOT NULL DEFAULT true, "company_type" "public"."companies_company_type_enum" NOT NULL DEFAULT 'АО', CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "signature" ADD CONSTRAINT "FK_459a0f1ba2818e1590cd3ce780d" FOREIGN KEY ("document_id") REFERENCES "documents"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_7f9de69b9f75391dc280dd640fc" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_b22c8136b3e83352b0013224801" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logs" ADD CONSTRAINT "FK_70c2c3d40d9f661ac502de51349" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7ae6334059289559722437bcc1c" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7ae6334059289559722437bcc1c"`);
        await queryRunner.query(`ALTER TABLE "logs" DROP CONSTRAINT "FK_70c2c3d40d9f661ac502de51349"`);
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_b22c8136b3e83352b0013224801"`);
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_7f9de69b9f75391dc280dd640fc"`);
        await queryRunner.query(`ALTER TABLE "signature" DROP CONSTRAINT "FK_459a0f1ba2818e1590cd3ce780d"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TYPE "public"."companies_company_type_enum"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "documents"`);
        await queryRunner.query(`DROP TYPE "public"."documents_status_enum"`);
        await queryRunner.query(`DROP TABLE "signature"`);
    }

}
