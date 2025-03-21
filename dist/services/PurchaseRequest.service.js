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
const item_entity_1 = require("../entities/item.entity");
const PurchaseRequest_entity_1 = require("../entities/PurchaseRequest.entity");
function createPR(_a) {
    return __awaiter(this, arguments, void 0, function* ({ quantity, status, requestDate, itemId, }) {
        try {
            const item = new item_entity_1.Item();
            const PR = new PurchaseRequest_entity_1.PurchaseRequest();
            const PurchaseRequestRepo = data_source_1.KevDB.getRepository(PurchaseRequest_entity_1.PurchaseRequest);
            // const getitem = await KevDB.createQueryBuilder().where(
            //   "item.id = :itemId",
            //   { itemId }
            // )
            item.id = itemId;
            const newPR = yield data_source_1.KevDB.createQueryBuilder()
                .insert()
                .into(PurchaseRequest_entity_1.PurchaseRequest)
                .values({ itemId: item, quantity, status, requestDate })
                .returning("*")
                .execute();
            // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
            const result = yield PurchaseRequestRepo.createQueryBuilder("PurchaseRequest")
                .leftJoin("ItemidId", "item")
                .getMany();
            return result;
        }
        catch (error) {
            throw error;
        }
    });
}
function updatePurchaseRequest(_a) {
    return __awaiter(this, arguments, void 0, function* ({ id, status, }) {
        try {
            // console.log(status, id)
            const purchaseRequest = yield data_source_1.KevDB.createQueryBuilder()
                .update(PurchaseRequest_entity_1.PurchaseRequest)
                .set({
                status,
            })
                .where("id = :id", { id })
                .execute();
            if (status === "Approve") {
            }
            return purchaseRequest;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = { createPR, updatePurchaseRequest };
