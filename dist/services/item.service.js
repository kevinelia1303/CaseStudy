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
function createItem(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, category, stock, lastUpdated }) {
        try {
            const item = new item_entity_1.Item();
            // const itemRepo = KevDB.getRepository(Item)
            const newItem = yield data_source_1.KevDB.createQueryBuilder()
                .insert()
                .into(item_entity_1.Item)
                .values({ name, category, stock, lastUpdated })
                .returning("*")
                .execute();
            // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
            return newItem.raw;
        }
        catch (error) {
            throw error;
        }
    });
}
function GetAllItem(_a) {
    return __awaiter(this, arguments, void 0, function* ({ name, category, page = 1, pageSize = 10, }) {
        try {
            const skipData = page === 1 ? 0 : (page - 1) * pageSize;
            const items = data_source_1.KevDB.getRepository(item_entity_1.Item)
                .createQueryBuilder("item")
                .offset((page - 1) * pageSize);
            if (name) {
                items.where("LOWER(item.name) LIKE LOWER(:name)", {
                    name: `%${name}%`,
                });
            }
            if (category) {
                items.andWhere("LOWER(item.category) LIKE LOWER(:category)", {
                    category,
                });
            }
            // const items = await itemRepo.findAndCount({
            //   skip: skipData,
            //   take: pageSize,
            // })
            // const items = await itemRepo
            //   .createQueryBuilder("item")
            //   .offset(skipData)
            //   .limit(pageSize)
            //   .getMany()
            return yield items.getManyAndCount();
        }
        catch (error) {
            throw error;
        }
    });
}
function GetItemById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const itemRepo = data_source_1.KevDB.getRepository(item_entity_1.Item);
            const item = itemRepo.findOne({
                where: {
                    id,
                },
            });
            return item;
        }
        catch (error) {
            throw error;
        }
    });
}
function SoftDelete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const today = new Date();
            const item = yield data_source_1.KevDB.createQueryBuilder()
                .update(item_entity_1.Item)
                .set({ deletedAt: today })
                .where("id = :id", { id })
                .execute();
        }
        catch (error) {
            throw error;
        }
    });
}
function updateItem(id_1, _a) {
    return __awaiter(this, arguments, void 0, function* (id, { name, category, stock, lastUpdated }) {
        try {
            const item = yield data_source_1.KevDB.createQueryBuilder()
                .update(item_entity_1.Item)
                .set({ name, category, stock, lastUpdated })
                .where("id = :id", { id })
                .returning("*")
                .execute();
            return item.raw;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = { createItem, GetAllItem, GetItemById, SoftDelete, updateItem };
