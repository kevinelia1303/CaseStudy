import { Request, Response, NextFunction } from "express"
import PurchaseRequestService from "../services/PurchaseRequest.service"
import itemService from "../services/item.service"

async function CreatePurchaseRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { itemId, quantity, status } = req.body

    const requestDate = new Date()

    const data = await PurchaseRequestService.createPR({
      quantity,
      status,
      requestDate,
      itemId,
    })

    res.status(200).send({
      message: "Purchase request created successfully",
      data,
    })
  } catch (error) {
    next(error)
  }
}

function GetAllPR(req: Request, res: Response, next: NextFunction) {
  try {
    const data = PurchaseRequestService.GetAllPR({
      page: 1, // default page
      pageSize: 10, // default page size
    })
    res.status(200).json({
      message: "Success",
      PurchaseRequest: data,
    })
  } catch (error) {
    next(error)
  }
}

function GetPOById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    res.status(200).send({
      message: "Success",
      searcId: id,
      data: {
        id,
      },
    })
  } catch (error) {
    next(error)
  }
}

function UpdatePO(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    res.status(200).send({
      message: "Purchase order updated successfully",
      data: {
        id,
      },
    })
  } catch (error) {
    next(error)
  }
}

function DeletePO(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    res.status(200).send({
      message: "Purchase order deleted successfully",
    })
  } catch (error) {
    next(error)
  }
}

async function ApprovePR(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const data = await PurchaseRequestService.updatePurchaseRequest({
      id,
      status: "Approve",
    })

    res.status(200).send({
      message: "Purchase request approved",
      data,
    })
  } catch (error) {
    next(error)
  }
}

function RejectPO(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    res.status(200).send({
      message: "Purchase order approved",
    })
  } catch (error) {
    next(error)
  }
}

function TrackOrderStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    res.status(200).send({
      message: "Success",
      searcId: id,
      data: {
        id,
      },
    })
  } catch (error) {
    next(error)
  }
}

export default {
  CreatePurchaseRequest,
  GetAllPR,
  GetPOById,
  UpdatePO,
  DeletePO,
  ApprovePR,
  RejectPO,
  TrackOrderStatus,
}
