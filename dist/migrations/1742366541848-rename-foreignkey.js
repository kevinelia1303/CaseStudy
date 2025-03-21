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
exports.RenameForeignkey1742366541848 = void 0;
class RenameForeignkey1742366541848 {
    constructor() {
        this.name = 'RenameForeignkey1742366541848';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " DROP CONSTRAINT "FK_016b029c72008b70b02cedda08f"`);
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " RENAME COLUMN "itemFkeyId" TO "itemIdId"`);
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " ADD CONSTRAINT "FK_d67b46f3ec689ca6f84109d3f61" FOREIGN KEY ("itemIdId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " DROP CONSTRAINT "FK_d67b46f3ec689ca6f84109d3f61"`);
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " RENAME COLUMN "itemIdId" TO "itemFkeyId"`);
            yield queryRunner.query(`ALTER TABLE "PurchaseRequest " ADD CONSTRAINT "FK_016b029c72008b70b02cedda08f" FOREIGN KEY ("itemFkeyId") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.RenameForeignkey1742366541848 = RenameForeignkey1742366541848;
