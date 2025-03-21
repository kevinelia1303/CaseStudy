"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
// controller
const item_controller_1 = __importDefault(require("../controllers/item.controller"));
const item_schema_1 = require("../schemas/item.schema");
const router = (0, express_1.Router)();
//Create Item
router.post("/", (0, validator_middleware_1.default)(item_schema_1.createItemSchema), item_controller_1.default.CreateItem);
//Get All Item
router.get("/", auth_middleware_1.verifyToken, auth_middleware_1.adminGuard, item_controller_1.default.GetAllItem);
//Get Item by ID
router.get("/:id", item_controller_1.default.GetItemById);
//Update Item
router.patch("/:id", item_controller_1.default.UpdateItem);
//Soft Delete
router.patch("/:id/delete", item_controller_1.default.SoftDelete);
exports.default = router;
