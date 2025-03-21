"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CreatePurchaseOrder(req, res, next) {
    try {
        const { code, name, qty, price } = req.body;
        res.status(200).send({
            message: "Purchase order created successfully",
            data: {
                code,
                name,
                qty,
                price,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
exports.default = { CreatePurchaseOrder };
