"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Multer = Multer;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
function Multer(type = "memoryStorage", filePrefix, folderName) {
    const defaultDir = path_1.default.join(__dirname, "../../public");
    const storage = type === "memoryStorage"
        ? multer_1.default.memoryStorage()
        : multer_1.default.diskStorage({
            destination: (req, file, cb) => {
                const destination = folderName
                    ? path_1.default.join(defaultDir, folderName)
                    : defaultDir;
                cb(null, destination);
            },
            filename: (req, file, cb) => {
                const prefix = filePrefix || "file-";
                const originalNameParts = file.originalname.split(".");
                const fileExtension = originalNameParts[originalNameParts.length - 1];
                cb(null, prefix + originalNameParts[0] + Date.now() + "." + fileExtension);
            },
        });
    return (0, multer_1.default)({
        storage,
        limits: {
            fileSize: 1024 * 1024,
        },
    });
}
