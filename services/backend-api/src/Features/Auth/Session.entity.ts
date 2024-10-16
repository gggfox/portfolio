import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  DeleteDateColumn,
  BaseEntity,
} from "typeorm";
import { ISession } from "connect-typeorm";

@Entity()
export class Session extends BaseEntity implements ISession {
  @Index()
  @Column("bigint")
  public expiredAt = Date.now();

  @PrimaryColumn("varchar", { length: 255 })
  public id = "";

  @Column("text")
  public json = "";

  @DeleteDateColumn()
  public destroyedAt?: Date;
}
