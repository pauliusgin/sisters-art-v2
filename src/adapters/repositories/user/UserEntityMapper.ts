import { EntityManager } from "typeorm";
import { UserEntity } from "./UserEntity";
import { Mapper } from "../Mapper";
import { User } from "../../../core/write/domain/aggregates/User";

export class UserEntityMapper implements Mapper<UserEntity, User> {
    constructor(private readonly entityManager: EntityManager) {}

    fromDomain(t: User): UserEntity {
        return this.entityManager.create(UserEntity, {
            id: t.props.id,
            email: t.props.email,
            password: t.props.password,
            phone: t.props.phone,
            recoveryCode: t.props.recoveryCode,
            signInAt: t.props.signInAt,
        });
    }

    toDomain(raw: UserEntity): User {
        const user = User.restore({
            id: raw.id,
            email: raw.email,
            password: raw.password,
            phone: raw.phone,
            recoveryCode: raw.recoveryCode,
            signInAt: raw.signInAt,
        });

        user.createdAt = raw.createdAt;
        user.updatedAt = raw.updatedAt;

        return user;
    }
}
