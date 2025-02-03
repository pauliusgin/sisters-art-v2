import { User } from "../aggregates/User";

export interface UserRepository {
    save(user: User): Promise<void>;

    getById(id: string): Promise<User>;

    getByEmail(email: string): Promise<User>;

    getByPhoneNumber(phone: string): Promise<User>;

    delete(userId: string): Promise<void>;
}
