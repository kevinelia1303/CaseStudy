import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameForeignkey1742366541848 implements MigrationInterface {
    name = 'RenameForeignkey1742366541848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PurchaseRequest " DROP CONSTRAINT "FK_016b029c72008b70b02cedda08f"`);
        await queryRunner.query(`ALTER TABLE "PurchaseRequest " RENAME COLUMN "itemFkeyId" TO "itemIdId"`);
        await queryRunner.query(`ALTER TABLE "PurchaseRequest " ADD CONSTRAINT "FK_d67b46f3ec689ca6f84109d3f61" FOREIGN KEY ("itemIdId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "PurchaseRequest " DROP CONSTRAINT "FK_d67b46f3ec689ca6f84109d3f61"`);
        await queryRunner.query(`ALTER TABLE "PurchaseRequest " RENAME COLUMN "itemIdId" TO "itemFkeyId"`);
        await queryRunner.query(`ALTER TABLE "PurchaseRequest " ADD CONSTRAINT "FK_016b029c72008b70b02cedda08f" FOREIGN KEY ("itemFkeyId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
