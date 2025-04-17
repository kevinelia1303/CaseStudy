import { Router, Request, Response, NextFunction } from "express"
import { verifyToken, adminGuard } from "../middlewares/auth.middleware"

// controller
import PurchaseRequestController from "../controllers/PurchaseRequest.controller"

const router = Router()

// create PO
router.post("/", PurchaseRequestController.CreatePurchaseRequest)

// get all PO
router.get("/", verifyToken, PurchaseRequestController.GetAllPR)

//get PO by id
router.get("/:id", PurchaseRequestController.GetPOById)

// update PO
router.put("/:id", PurchaseRequestController.UpdatePO)

// delete PO
router.delete("/:id", PurchaseRequestController.DeletePO)

// approve PO
router.patch("/:id/approve", PurchaseRequestController.ApprovePR)

// reject PO
router.put("/:id/reject", PurchaseRequestController.RejectPO)

// track order status
router.get("/:id/status", PurchaseRequestController.TrackOrderStatus)

export default router
