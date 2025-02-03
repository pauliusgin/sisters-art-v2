import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { ArtworkType } from "../../../../messages/types/ArtworkType";
import { ArtworkMethod } from "../../../../messages/types/ArtworkMethod";
import { ArtworkMaterial } from "../../../../messages/types/ArtworkMaterial";
import { Author } from "../../../../messages/types/Author";

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
    image: string;

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
