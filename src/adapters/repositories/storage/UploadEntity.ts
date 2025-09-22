import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { FileStatus, FileType, FileUsage } from "../../../messages";

@Entity("uploads")
export class UploadEntity {
  @PrimaryColumn({
    type: "varchar",
  })
  id: string;

  @Index()
  @Column({
    nullable: true,
    type: "varchar",
  })
  userId: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: FileType,
    default: FileType.IMAGE,
  })
  fileType: FileType;

  @Column({
    nullable: false,
    type: "varchar",
  })
  url: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  token: string;

  @Column({
    nullable: false,
    type: "varchar",
  })
  path: string;

  @Column({
    nullable: true,
    type: "varchar",
  })
  usageEntityId: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: FileUsage,
  })
  usage: FileUsage;

  @Column({
    nullable: false,
    type: "enum",
    enum: FileStatus,
    default: FileStatus.PENDING,
  })
  status: FileStatus;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
