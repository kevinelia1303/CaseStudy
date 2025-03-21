import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarToUser1742528291067 implements MigrationInterface {
    name = 'AddAvatarToUser1742528291067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "ProcurementOrder" ADD "code" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ProcurementOrder" DROP COLUMN "code"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
