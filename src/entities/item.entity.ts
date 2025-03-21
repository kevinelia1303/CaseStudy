import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  DeleteDateColumn,
} from "typeorm"

import { PurchaseRequest } from "./PurchaseRequest.entity"

@Entity({ name: "item" })
export class Item {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({
    nullable: false,
  })
  name: string

  @Column()
  category: string

  @Column()
  stock: number

  @Column()
  lastUpdated: Date

  @DeleteDateColumn() // timestamp sm date
  deletedAt?: Date

  @OneToMany(() => PurchaseRequest, (purchaseRequest) => purchaseRequest.itemId)
  PurchaseRequest_fkey: PurchaseRequest[]
}
