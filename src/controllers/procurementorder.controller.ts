import { Request, Response, NextFunction } from "express"
import procurementorderService from "../services/procurementorder.service"

async function CreatePrcourementOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { purchaseRequestId, supplier, status } = req.body

    const orderDate = new Date()

    const data = await procurementorderService.createPO({
      purchaseRequestId,
      supplier,
      status,
      orderDate,
    })

    res.status(200).send({
      message: "Purchase request created successfully",
      data,
    })
  } catch (error) {
    next(error)
  }
}

export default { CreatePrcourementOrder }
