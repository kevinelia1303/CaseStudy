"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./data-source");
const corsOptions_1 = __importDefault(require("./configCORS/corsOptions"));
const error_middleware_1 = require("./middlewares/error.middleware");
// router
const PurchaseRequest_router_1 = __importDefault(require("./routers/PurchaseRequest.router"));
const procurementorder_router_1 = __importDefault(require("./routers/procurementorder.router"));
const item_router_1 = __importDefault(require("./routers/item.router"));
const user_router_1 = __importDefault(require("./routers/user.router"));
const callapi_router_1 = __importDefault(require("./routers/callapi.router"));
const PORT = config_1.PORT || 8080;
const app = (0, express_1.default)();
//middleware global
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(corsOptions_1.default));
// app.use(cors()) //open to public
// app.use(
//   cors({
//     origin: "procurement-app-rkp1ve.flutterflow.app",
//     methods: "GET,PUT,POST",
//     allowedHeaders: "Origin, Authorization",
//   })
// )
app.use(express_1.default.json()); // untuk parsing json
app.use("/auth", user_router_1.default);
app.use("/procurement-order", procurementorder_router_1.default);
app.use("/purchase-request", PurchaseRequest_router_1.default);
app.use("/item", item_router_1.default);
app.use("/callapi", callapi_router_1.default);
app.use(error_middleware_1.ErrorMiddleware);
app.use((err, req, res, next) => {
    const error = err;
    res.status(500).send(error.message);
});
data_source_1.KevDB.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log("Database connected");
})
    .catch((err) => {
    console.log("Database connection failed");
});
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })
