import {MigrationInterface, QueryRunner} from "typeorm";

export class copaniesManyDocuments1628499126240 implements MigrationInterface {
    name = 'copaniesManyDocuments1628499126240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_85d4e65f38815d121b87e9ed7aa"`);
        await queryRunner.query(`ALTER TABLE "documents" RENAME COLUMN "author_id" TO "company_id"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_7f9de69b9f75391dc280dd640fc" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_7f9de69b9f75391dc280dd640fc"`);
        await queryRunner.query(`ALTER TABLE "documents" RENAME COLUMN "company_id" TO "author_id"`);
        await queryRunner.query(`ALTER TABLE "documents" ADD CONSTRAINT "FK_85d4e65f38815d121b87e9ed7aa" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
