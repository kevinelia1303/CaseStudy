import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  DeleteDateColumn,
} from "typeorm"

import { PurchaseRequest } from "./PurchaseRequest.entity"

@Entity({ name: "ProcurementOrder" })
export class ProcurementOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @OneToOne(() => PurchaseRequest)
  @JoinColumn()
  purchaseRequestId: PurchaseRequest

  @Column()
  code: string

  @Column()
  supplier: string

  @Column({
    nullable: false,
  })
  status: string

  @Column({
    nullable: false,
  })
  orderDate: Date

  @DeleteDateColumn()
  deletedAt?: Date
}
