import { Router, Request, Response, NextFunction } from "express"
import validateReq from "../middlewares/validator.middleware"
import { verifyToken, adminGuard } from "../middlewares/auth.middleware"
// controller
import ItemController from "../controllers/item.controller"
import { createItemSchema } from "../schemas/item.schema"

const router = Router()

//Create Item
router.post("/", validateReq(createItemSchema), ItemController.CreateItem)

//Get All Item
router.get("/", verifyToken, adminGuard, ItemController.GetAllItem)

//Get Item by ID
router.get("/:id", ItemController.GetItemById)

//Update Item
router.patch("/:id", ItemController.UpdateItem)

//Soft Delete
router.patch("/:id/delete", ItemController.SoftDelete)

export default router
