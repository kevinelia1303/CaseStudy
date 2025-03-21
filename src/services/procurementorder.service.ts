import { KevDB } from "../data-source"
import { ProcurementOrder } from "../entities/ProcurementOrder.entity"
import { PurchaseRequest } from "../entities/PurchaseRequest.entity"
import IProcurmentOrder from "../interfaces/procurementorder.interface"

async function createPO({
  purchaseRequestId,
  supplier,
  status,
  orderDate,
}: IProcurmentOrder) {
  try {
    const PR = new PurchaseRequest()
    const PO = new ProcurementOrder()
    const ProcurementOrderRepo = KevDB.getRepository(ProcurementOrder)

    PR.id = purchaseRequestId

    const lastOrder = await ProcurementOrderRepo.createQueryBuilder(
      "ProcurementOrder"
    )
      .select("code")
      .orderBy("ProcurementOrder.code", "DESC")
      .getOne()

    const newCode = lastOrder ? parseInt(lastOrder.code) + 1 : 1
    const newPO = await KevDB.createQueryBuilder()
      .insert()
      .into(ProcurementOrder)
      .values({
        purchaseRequestId: PR,
        supplier,
        status,
        orderDate,
        code: newCode.toString().padStart(5, "0"),
      })
      .returning("*")
      .execute()
    // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
    const result = await ProcurementOrderRepo.createQueryBuilder(
      "ProcurementOrder"
    )
      .leftJoin("purchaseRequestIdId", "PurchaseRequest")
      .getMany()
    return result
  } catch (error) {
    throw error
  }
}

async function getLastPO() {
  try {
    const ProcurementOrderRepo = KevDB.getRepository(ProcurementOrder)
    const lastOrder = await ProcurementOrderRepo.createQueryBuilder(
      "ProcurementOrder"
    )
      .orderBy("ProcurementOrder.code", "DESC")
      .getOne()
    return lastOrder ? lastOrder.code : null
  } catch (error) {
    throw error
  }
}

export default { createPO, getLastPO }
