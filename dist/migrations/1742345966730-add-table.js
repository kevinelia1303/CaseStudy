"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddTable1742345966730 = void 0;
class AddTable1742345966730 {
    constructor() {
        this.name = 'AddTable1742345966730';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "item" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "stock" integer NOT NULL, "lastStockUpdate" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "PurchaseRequest " ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "status" character varying NOT NULL, "requestDate" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "itemFkeyId" uuid, CONSTRAINT "PK_9145c8370da878ab5faef9efd4e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "ProcurementOrder" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "supplier" character varying NOT NULL, "status" character varying NOT NULL, "orderDate" TIMESTAMP NOT NULL, "deletedAt" TIMESTAMP, "purchaseRequestIdId" uuid, CONSTRAINT "REL_9fd034e241ac97e96ad826ad3d" UNIQUE ("purchaseRequestIdId"), CONSTRAINT "PK_6aee4db135ca49df82c7cf3ba3f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " ADD CONSTRAINT "FK_016b029c72008b70b02cedda08f" FOREIGN KEY ("itemFkeyId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "ProcurementOrder" ADD CONSTRAINT "FK_9fd034e241ac97e96ad826ad3d8" FOREIGN KEY ("purchaseRequestIdId") REFERENCES "PurchaseRequest "("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "ProcurementOrder" DROP CONSTRAINT "FK_9fd034e241ac97e96ad826ad3d8"`);
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " DROP CONSTRAINT "FK_016b029c72008b70b02cedda08f"`);
            yield queryRunner.query(`DROP TABLE "ProcurementOrder"`);
            yield queryRunner.query(`DROP TABLE "PurchaseRequest "`);
            yield queryRunner.query(`DROP TABLE "item"`);
        });
    }
}
exports.AddTable1742345966730 = AddTable1742345966730;
