"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createItemSchema = void 0;
const zod_1 = require("zod");
exports.createItemSchema = zod_1.z.object({
    name: zod_1.z.string().trim().nonempty("Required"),
    category: zod_1.z.string().trim().nonempty("Required"),
    stock: zod_1.z.number().nonnegative("Must be positive integer"),
});
