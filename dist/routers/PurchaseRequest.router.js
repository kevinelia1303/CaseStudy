"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// controller
const PurchaseRequest_controller_1 = __importDefault(require("../controllers/PurchaseRequest.controller"));
const router = (0, express_1.Router)();
// create PO
router.post("/", PurchaseRequest_controller_1.default.CreatePurchaseRequest);
// get all PO
router.get("/", PurchaseRequest_controller_1.default.GetAllPurchaseOrders);
//get PO by id
router.get("/:id", PurchaseRequest_controller_1.default.GetPOById);
// update PO
router.put("/:id", PurchaseRequest_controller_1.default.UpdatePO);
// delete PO
router.delete("/:id", PurchaseRequest_controller_1.default.DeletePO);
// approve PO
router.patch("/:id/approve", PurchaseRequest_controller_1.default.ApprovePR);
// reject PO
router.put("/:id/reject", PurchaseRequest_controller_1.default.RejectPO);
// track order status
router.get("/:id/status", PurchaseRequest_controller_1.default.TrackOrderStatus);
exports.default = router;
