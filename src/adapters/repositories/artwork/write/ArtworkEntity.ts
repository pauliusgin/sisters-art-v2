import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  ArtworkMaterial,
  ArtworkMethod,
  ArtworkType,
  Author,
} from "../../../../messages";

@Entity("artworks")
export class ArtworkEntity {
  @PrimaryColumn({
    type: "varchar",
  })
  id: string;

  @Column({
    nullable: true,
    type: "varchar",
  })
  title: string;

  @Column({
    nullable: true,
    type: "enum",
    enum: Author,
  })
  author: Author;

  @Column({
    nullable: true,
    type: "int",
    default: 0,
  })
  authorAge: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: ArtworkType,
    default: ArtworkType.DRAWING,
  })
  type: ArtworkType;

  @Column({
    nullable: true,
    type: "enum",
    enum: ArtworkMethod,
  })
  method: ArtworkMethod;

  @Column({
    nullable: true,
    type: "enum",
    enum: ArtworkMaterial,
  })
  material: ArtworkMaterial;

  @Column({
    nullable: false,
    type: "varchar",
  })
  fileUrl: string;

  @Column({
    nullable: true,
    type: "timestamp",
  })
  date: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
