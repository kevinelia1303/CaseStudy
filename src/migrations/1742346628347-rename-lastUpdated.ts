import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameLastUpdated1742346628347 implements MigrationInterface {
    name = 'RenameLastUpdated1742346628347'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "lastStockUpdate" TO "lastUpdated"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "item" RENAME COLUMN "lastUpdated" TO "lastStockUpdate"`);
    }

}
