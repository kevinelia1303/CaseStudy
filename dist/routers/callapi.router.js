"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const callapi_controller_1 = __importDefault(require("../controllers/callapi.controller"));
const router = (0, express_1.Router)();
//Get All Item
router.get("/", auth_middleware_1.verifyToken, callapi_controller_1.default.getDataFromExternalAPI);
exports.default = router;
