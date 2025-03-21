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
const data_source_1 = require("../data-source");
const ProcurementOrder_entity_1 = require("../entities/ProcurementOrder.entity");
const PurchaseRequest_entity_1 = require("../entities/PurchaseRequest.entity");
function createPO(_a) {
    return __awaiter(this, arguments, void 0, function* ({ purchaseRequestId, supplier, status, orderDate, }) {
        try {
            const PR = new PurchaseRequest_entity_1.PurchaseRequest();
            const PO = new ProcurementOrder_entity_1.ProcurementOrder();
            const ProcurementOrderRepo = data_source_1.KevDB.getRepository(ProcurementOrder_entity_1.ProcurementOrder);
            PR.id = purchaseRequestId;
            const lastOrder = yield ProcurementOrderRepo.createQueryBuilder("ProcurementOrder")
                .select("code")
                .orderBy("ProcurementOrder.code", "DESC")
                .getOne();
            const newCode = lastOrder ? parseInt(lastOrder.code) + 1 : 1;
            const newPO = yield data_source_1.KevDB.createQueryBuilder()
                .insert()
                .into(ProcurementOrder_entity_1.ProcurementOrder)
                .values({
                purchaseRequestId: PR,
                supplier,
                status,
                orderDate,
                code: newCode.toString().padStart(5, "0"),
            })
                .returning("*")
                .execute();
            // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
            const result = yield ProcurementOrderRepo.createQueryBuilder("ProcurementOrder")
                .leftJoin("purchaseRequestIdId", "PurchaseRequest")
                .getMany();
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function getLastPO() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const ProcurementOrderRepo = data_source_1.KevDB.getRepository(ProcurementOrder_entity_1.ProcurementOrder);
            const lastOrder = yield ProcurementOrderRepo.createQueryBuilder("ProcurementOrder")
                .orderBy("ProcurementOrder.code", "DESC")
                .getOne();
            return lastOrder ? lastOrder.code : null;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = { createPO, getLastPO };
