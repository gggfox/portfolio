import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  username!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  password?: string | null;

  @CreateDateColumn()
  createDate?: string;

  @UpdateDateColumn()
  updateDate?: string;
}
