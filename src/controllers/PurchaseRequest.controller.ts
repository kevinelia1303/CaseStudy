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

function GetAllPurchaseOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const { SupplierSearch } = req.query
    res.status(200).send({
      message: "Success",
      data: [
        {
          id: 1,
          itemName: "Laptop",
          category: "Electronic",
          quantity: 10,
          supplier: "PT. ABC",
          status: "Pending",
        },
        {
          id: 2,
          itemName: "Monitor",
          category: "Electronic",
          quantity: 5,
          supplier: "PT. XYZ",
          status: "Approved",
        },
      ],
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
  GetAllPurchaseOrders,
  GetPOById,
  UpdatePO,
  DeletePO,
  ApprovePR,
  RejectPO,
  TrackOrderStatus,
}
