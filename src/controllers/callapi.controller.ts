import { Request, Response, NextFunction } from "express"
import CallApiService from "../services/callapi.service"

async function getDataFromExternalAPI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const callApiService = new CallApiService()
    const data = await callApiService.fetchData()
    res.status(200).json({
      message: "Data fetched successfully",
      data,
    })
  } catch (error) {
    next(error)
  }
}

export default { getDataFromExternalAPI }
