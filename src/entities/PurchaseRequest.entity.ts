import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  DeleteDateColumn,
} from "typeorm"

import { Item } from "./item.entity"
import { ProcurementOrder } from "./ProcurementOrder.entity"

@Entity({ name: "PurchaseRequest " })
export class PurchaseRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => Item, (item) => item.PurchaseRequest_fkey)
  itemId: Item

  @Column()
  quantity: number

  @Column({
    nullable: false,
  })
  status: string

  @Column({
    nullable: false,
  })
  requestDate: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
