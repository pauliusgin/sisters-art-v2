import "reflect-metadata";
import { inject, injectable } from "inversify";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { User } from "../../domain/aggregates/User";
import { Usecase } from "../Usecase";
import { UserRepository } from "../../domain/repositories/UserRepository";

export interface SignUpInput {
    email: string;
    password: string;
}

@injectable()
export class SignUp implements Usecase<SignUpInput, string> {
    constructor(
        @inject(AppIdentifiers.userRepository)
        private userRepository: UserRepository
    ) {}
    async execute(request: SignUpInput): Promise<string> {
        const { email, password } = request;

        const responseMessage = `If this email is not already registered, account will be created. Please log in.`;

        const userAlreadyExists = await this.userRepository.getByEmail(email);
        if (userAlreadyExists) {
            await this.randomDelay();

            return responseMessage;
        }

        const user = User.signUp({
            email,
            password,
        });

        await this.userRepository.save(user);

        return responseMessage;
    }

    async randomDelay(): Promise<void> {
        const randomMs = Math.floor(Math.random() * 500) + 200;
        return new Promise((resolve) => setTimeout(resolve, randomMs));
    }
}
