import IItem from "../interfaces/item.interface"
import { KevDB } from "../data-source"
import { Item } from "../entities/item.entity"

async function createItem({ name, category, stock, lastUpdated }: IItem) {
  try {
    const item = new Item()
    // const itemRepo = KevDB.getRepository(Item)
    const newItem = await KevDB.createQueryBuilder()
      .insert()
      .into(Item)
      .values({ name, category, stock, lastUpdated })
      .returning("*")
      .execute()
    // const newItem = itemRepo.create({ name, category, stock, lastUpdated })
    return newItem.raw
  } catch (error) {
    throw error
  }
}

async function GetAllItem({
  name,
  category,
  page = 1,
  pageSize = 10,
}: {
  name?: string
  category?: string
  page: number
  pageSize: number
}) {
  try {
    const skipData = page === 1 ? 0 : (page - 1) * pageSize
    const items = KevDB.getRepository(Item)
      .createQueryBuilder("item")
      .offset((page - 1) * pageSize)

    if (name) {
      items.where("LOWER(item.name) LIKE LOWER(:name)", {
        name: `%${name}%`,
      })
    }
    if (category) {
      items.andWhere("LOWER(item.category) LIKE LOWER(:category)", {
        category,
      })
    }
    // const items = await itemRepo.findAndCount({
    //   skip: skipData,
    //   take: pageSize,
    // })

    // const items = await itemRepo
    //   .createQueryBuilder("item")
    //   .offset(skipData)
    //   .limit(pageSize)
    //   .getMany()
    return await items.getManyAndCount()
  } catch (error) {
    throw error
  }
}

async function GetItemById(id: string) {
  try {
    const itemRepo = KevDB.getRepository(Item)
    const item = itemRepo.findOne({
      where: {
        id,
      },
    })

    return item
  } catch (error) {
    throw error
  }
}

async function SoftDelete(id: string) {
  try {
    const today = new Date()
    const item = await KevDB.createQueryBuilder()
      .update(Item)
      .set({ deletedAt: today })
      .where("id = :id", { id })
      .execute()
  } catch (error) {
    throw error
  }
}

async function updateItem(
  id: string,
  { name, category, stock, lastUpdated }: Partial<IItem>
) {
  try {
    const item = await KevDB.createQueryBuilder()
      .update(Item)
      .set({ name, category, stock, lastUpdated })
      .where("id = :id", { id })
      .returning("*")
      .execute()

    return item.raw
  } catch (error) {
    throw error
  }
}

export default { createItem, GetAllItem, GetItemById, SoftDelete, updateItem }
