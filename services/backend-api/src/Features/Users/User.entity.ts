import "reflect-metadata";
import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Transaction } from "../Finance/Transaction.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  username!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  pictureUrl?: string;

  @Column("text", { array: true, nullable: true, default: [] })
  roles?: string[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions!: Transaction[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
