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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_service_1 = __importDefault(require("../services/item.service"));
function CreateItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, category, stock } = req.body;
            const lastUpdated = new Date();
            const data = yield item_service_1.default.createItem({
                name,
                category,
                stock,
                lastUpdated,
            });
            res.status(200).send({
                message: "New Item created successfully",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetAllItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email } = req.user;
            console.log(email);
            const { page, pageSize, name, category } = req.query;
            const data = yield item_service_1.default.GetAllItem({
                name: String(name),
                category: String(category),
                page: Number(page),
                pageSize: Number(pageSize),
            });
            res.status(200).json({
                message: "Success",
                items: data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetItemById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield item_service_1.default.GetItemById(id);
            res.status(200).send({
                message: "Success",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function SoftDelete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const data = yield item_service_1.default.SoftDelete(id);
        res.status(200).send({
            message: "Soft Delete Success",
        });
    });
}
function UpdateItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { name, category, stock } = req.body;
            const lastUpdated = new Date();
            const data = yield item_service_1.default.updateItem(id, {
                name,
                category,
                stock,
                lastUpdated,
            });
            res.status(200).send({
                message: "Item updated successfully",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = { CreateItem, GetAllItem, GetItemById, SoftDelete, UpdateItem };
