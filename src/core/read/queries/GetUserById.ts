import "reflect-metadata";
import { Usecase } from "../../write/usecases/Usecase";
import { inject, injectable } from "inversify";
import { AppIdentifiers } from "../../AppIdentifiers";
import { UserRepository } from "../../write/domain/repositories/UserRepository";
import { User } from "../../write/domain/aggregates/User";
import { UserErrors } from "../../write/domain/errors/UserErrors";

@injectable()
export class GetUserById implements Usecase<string, User> {
    constructor(
        @inject(AppIdentifiers.userRepository)
        private readonly _userRepository: UserRepository
    ) {}

    async execute(userId: string): Promise<User> {
        const user = await this._userRepository.getById(userId);
        if (!user) {
            throw new UserErrors.UserNotFound();
        }

        return user;
    }
}
