import { KevDB } from "../data-source"
import { Item } from "../entities/item.entity"
import { PurchaseRequest } from "../entities/PurchaseRequest.entity"
import IPurchaseRequest from "../interfaces/purchaserequest.interface"

async function createPR({
  quantity,
  status,
  requestDate,
  itemId,
}: IPurchaseRequest) {
  try {
    const item = new Item()
    const PR = new PurchaseRequest()
    const PurchaseRequestRepo = KevDB.getRepository(PurchaseRequest)

    // const getitem = await KevDB.createQueryBuilder().where(
    //   "item.id = :itemId",
    //   { itemId }
    // )

    item.id = itemId

    const newPR = await KevDB.createQueryBuilder()
      .insert()
      .into(PurchaseRequest)
      .values({ itemId: item, quantity, status, requestDate })
      .returning("*")
      .execute()
    // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
    const result = await PurchaseRequestRepo.createQueryBuilder(
      "PurchaseRequest"
    )
      .leftJoin("ItemidId", "item")
      .getMany()
    return result
  } catch (error) {
    throw error
  }
}

async function GetAllPR({
  page = 1,
  pageSize = 10,
}: {
  page: number
  pageSize: number
}) {
  try {
    const skipData = page === 1 ? 0 : (page - 1) * pageSize
    // const PR = KevDB.getRepository(PurchaseRequest)
    //   .createQueryBuilder("PurchaseRequest")
    //   .leftJoinAndSelect("PurchaseRequest.itemIdId", "item")
    //   .offset((page - 1) * pageSize)

    const PRRepo = KevDB.getRepository(PurchaseRequest)
    const result = await PRRepo.createQueryBuilder("PurchaseRequest")
      .leftJoinAndSelect("ItemidId", "item")
      .getMany()

    return result
  } catch (error) {
    throw error
  }
}

async function updatePurchaseRequest({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  try {
    // console.log(status, id)
    const purchaseRequest = await KevDB.createQueryBuilder()
      .update(PurchaseRequest)
      .set({
        status,
      })
      .where("id = :id", { id })
      .execute()
    if (status === "Approve") {
    }

    return purchaseRequest
  } catch (error) {
    throw error
  }
}

export default { createPR, updatePurchaseRequest, GetAllPR }
