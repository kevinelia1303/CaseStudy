import express, { Application, Request, Response, NextFunction } from "express"
import { PORT as port } from "./config"
import helmet from "helmet"
import cors from "cors"
import { KevDB } from "./data-source"
import corsOptions from "./configCORS/corsOptions"
import { ErrorMiddleware } from "./middlewares/error.middleware"

// router
import PurchaseRequestRouter from "./routers/PurchaseRequest.router"
import ProcurementOrderRouter from "./routers/procurementorder.router"
import ItemRouter from "./routers/item.router"
import UserRouter from "./routers/user.router"
import CallApiRouter from "./routers/callapi.router"

const PORT = port || 8080
const app: Application = express()

//middleware global
app.use(helmet())
app.use(cors(corsOptions))
// app.use(cors()) //open to public
// app.use(
//   cors({
//     origin: "procurement-app-rkp1ve.flutterflow.app",
//     methods: "GET,PUT,POST",
//     allowedHeaders: "Origin, Authorization",
//   })
// )
app.use(express.json()) // untuk parsing json

app.use("/auth", UserRouter)

app.use("/procurement-order", ProcurementOrderRouter)

app.use("/purchase-request", PurchaseRequestRouter)

app.use("/item", ItemRouter)

app.use("/callapi", CallApiRouter)

app.use(ErrorMiddleware)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const error = err as any
  res.status(500).send(error.message)
})

KevDB.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
    console.log("Database connected")
  })
  .catch((err) => {
    console.log("Database connection failed")
  })

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })
