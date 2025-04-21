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
const PurchaseRequest_service_1 = __importDefault(require("../services/PurchaseRequest.service"));
function CreatePurchaseRequest(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { itemId, quantity, status } = req.body;
            const requestDate = new Date();
            const data = yield PurchaseRequest_service_1.default.createPR({
                quantity,
                status,
                requestDate,
                itemId,
            });
            res.status(200).send({
                message: "Purchase request created successfully",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetAllPR(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { page, pageSize } = req.query;
            const data = yield PurchaseRequest_service_1.default.GetAllPR({
                page: Number(page), // default page
                pageSize: Number(pageSize), // default page size
            });
            res.status(200).json({
                message: "Success",
                PurchaseRequest: data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function GetPOById(req, res, next) {
    try {
        const { id } = req.params;
        res.status(200).send({
            message: "Success",
            searcId: id,
            data: {
                id,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
function UpdatePO(req, res, next) {
    try {
        const { id } = req.params;
        res.status(200).send({
            message: "Purchase order updated successfully",
            data: {
                id,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
function DeletePO(req, res, next) {
    try {
        const { id } = req.params;
        res.status(200).send({
            message: "Purchase order deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
}
function ApprovePR(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield PurchaseRequest_service_1.default.updatePurchaseRequest({
                id,
                status: "Approve",
            });
            res.status(200).send({
                message: "Purchase request approved",
                data,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function RejectPO(req, res, next) {
    try {
        const { id } = req.params;
        res.status(200).send({
            message: "Purchase order approved",
        });
    }
    catch (error) {
        next(error);
    }
}
function TrackOrderStatus(req, res, next) {
    try {
        const { id } = req.params;
        res.status(200).send({
            message: "Success",
            searcId: id,
            data: {
                id,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
exports.default = {
    CreatePurchaseRequest,
    GetAllPR,
    GetPOById,
    UpdatePO,
    DeletePO,
    ApprovePR,
    RejectPO,
    TrackOrderStatus,
};
