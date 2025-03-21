import { Request, Response, NextFunction } from "express"

import ItemService from "../services/item.service"
import { PayloadParams } from "../custom"

async function CreateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, category, stock } = req.body
    const lastUpdated = new Date()
    const data = await ItemService.createItem({
      name,
      category,
      stock,
      lastUpdated,
    })

    res.status(200).send({
      message: "New Item created successfully",
      data,
    })
  } catch (error) {
    next(error)
  }
}

async function GetAllItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.user as PayloadParams
    console.log(email)
    const { page, pageSize, name, category } = req.query
    const data = await ItemService.GetAllItem({
      name: String(name),
      category: String(category),
      page: Number(page),
      pageSize: Number(pageSize),
    })
    res.status(200).json({
      message: "Success",
      items: data,
    })
  } catch (error) {
    next(error)
  }
}

async function GetItemById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params

    const data = await ItemService.GetItemById(id)

    res.status(200).send({
      message: "Success",
      data,
    })
  } catch (error) {
    next(error)
  }
}

async function SoftDelete(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  const data = await ItemService.SoftDelete(id)

  res.status(200).send({
    message: "Soft Delete Success",
  })
}

async function UpdateItem(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { name, category, stock } = req.body
    const lastUpdated = new Date()

    const data = await ItemService.updateItem(id, {
      name,
      category,
      stock,
      lastUpdated,
    })

    res.status(200).send({
      message: "Item updated successfully",
      data,
    })
  } catch (error) {
    next(error)
  }
}

export default { CreateItem, GetAllItem, GetItemById, SoftDelete, UpdateItem }
