import { PurchaseRequest } from "../entities/PurchaseRequest.entity"

export default interface IProcurmentOrder {
  purchaseRequest?: PurchaseRequest
  purchaseRequestId: string
  code?: string
  supplier: string
  status: string
  orderDate: Date
}
