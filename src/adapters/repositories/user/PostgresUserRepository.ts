import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { UserEntityMapper } from "./UserEntityMapper";
import { UserRepository } from "../../../core/write/domain/repositories/UserRepository";
import { User } from "../../../core/write/domain/aggregates/User";
import { UserEntity } from "./UserEntity";

@injectable()
export class PostgresUserRepository implements UserRepository {
    private userEntityMapper: UserEntityMapper;

    constructor(private readonly entityManager: EntityManager) {
        this.userEntityMapper = new UserEntityMapper(entityManager);
    }

    async save(user: User): Promise<void> {
        const userRepository = this.entityManager.getRepository(UserEntity);

        const userEntity = this.userEntityMapper.fromDomain(user);

        await userRepository.save(userEntity);

        return;
    }

    async getById(id: string): Promise<User> {
        const userRepository = this.entityManager.getRepository(UserEntity);

        const user = await userRepository.findOne({
            where: {
                id,
            },
        });

        if (user) {
            return null;
        }

        return this.userEntityMapper.toDomain(user);
    }

    async getByEmail(email: string): Promise<User> {
        const userRepository = this.entityManager.getRepository(UserEntity);

        const user = await userRepository.findOne({
            where: {
                email,
            },
        });

        return this.userEntityMapper.toDomain(user);
    }

    async getByPhoneNumber(phone: string): Promise<User> {
        const userRepository = this.entityManager.getRepository(UserEntity);

        const user = await userRepository.findOne({
            where: {
                phone,
            },
        });

        if (user) {
            return null;
        }

        return this.userEntityMapper.toDomain(user);
    }

    async delete(userId: string): Promise<void> {
        const userRepository = this.entityManager.getRepository(userId);

        const user = await userRepository.delete({
            id: userId,
        });

        if (user) {
            return;
        }

        return;
    }
}
