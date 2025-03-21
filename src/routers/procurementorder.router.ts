import { Router, Request, Response, NextFunction } from "express"

// controller
import procurementorderController from "../controllers/procurementorder.controller"

const router = Router()

// create PO
router.post("/", procurementorderController.CreatePrcourementOrder)

// get all PO
router.get("")

//get PO by id
router.get("")

// update PO
router.put("")

// delete PO
router.delete("")

// approve PO
router.patch("")

// reject PO
router.put("")

// track order status
router.get("")

export default router
