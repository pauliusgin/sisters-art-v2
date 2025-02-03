import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("users")
export class UserEntity {
    @PrimaryColumn({
        type: "varchar",
    })
    id: string;

    @Column({
        nullable: true,
        type: "varchar",
        unique: true,
    })
    email: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    password: string;

    @Column({
        nullable: true,
        type: "varchar",
        unique: false,
    })
    phone: string;

    @Column({
        nullable: true,
        type: "varchar",
    })
    recoveryCode?: string;

    @Column({
        nullable: false,
        type: "timestamp",
    })
    signInAt: Date;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;
}
