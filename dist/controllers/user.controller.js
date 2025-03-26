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
const user_service_1 = __importDefault(require("../services/user.service"));
exports.default = {
    Register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { file } = req;
                const { email, name, password } = req.body;
                yield user_service_1.default.register({ email, name, password, file });
                res.status(200).send({
                    message: "OK",
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    Login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_service_1.default.login(req.body);
                res
                    .status(200)
                    .cookie("access_token", data.access_token)
                    .send({
                    message: "OK",
                    data: {
                        refresh_token: data.access_token,
                        session_token: data.session_token,
                        user: data.user,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
    RefreshToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.user;
                const data = yield user_service_1.default.refreshToken(email);
                res
                    .status(200)
                    .cookie("access_token", data.access_token)
                    .send({
                    message: "OK",
                    data: {
                        session_token: data.session_token,
                        user: data.user,
                    },
                });
            }
            catch (error) {
                next(error);
            }
        });
    },
};
