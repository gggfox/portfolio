import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { User } from "../Users/User.entity";

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name!: string;

  @Column()
  type?: string;

  @Column({ nullable: true })
  group?: string;

  @Column({ nullable: false })
  amount!: number;

  @Column()
  details?: string;

  @Column({ nullable: false })
  date!: Date;

  @ManyToOne(() => User, (user) => user.transactions)
  user!: User;
}
