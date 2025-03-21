"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controller
const procurementorder_controller_1 = __importDefault(require("../controllers/procurementorder.controller"));
const router = (0, express_1.Router)();
// create PO
router.post("/", procurementorder_controller_1.default.CreatePrcourementOrder);
// get all PO
router.get("");
//get PO by id
router.get("");
// update PO
router.put("");
// delete PO
router.delete("");
// approve PO
router.patch("");
// reject PO
router.put("");
// track order status
router.get("");
exports.default = router;
