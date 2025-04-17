import { Router, Request, Response, NextFunction } from "express"
import { verifyToken, adminGuard } from "../middlewares/auth.middleware"
import CallApiController from "../controllers/callapi.controller"

const router = Router()

//Get All Item
router.get("/", verifyToken, CallApiController.getDataFromExternalAPI)

export default router
