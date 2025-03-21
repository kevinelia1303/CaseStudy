import { Item } from "../entities/item.entity"

export default interface IPurchaseRequest {
  item?: Item
  quantity: number
  status: string
  requestDate: Date
  itemId: string
}
