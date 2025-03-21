"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controller
const PurchaseOrder_controller_1 = __importDefault(require("../controllers/PurchaseOrder.controller"));
const router = (0, express_1.Router)();
router.post("/", PurchaseOrder_controller_1.default.CreatePurchaseOrder);
exports.default = router;
