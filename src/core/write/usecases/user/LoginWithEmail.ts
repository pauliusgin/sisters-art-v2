import "reflect-metadata";
import { inject, injectable } from "inversify";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { User } from "../../domain/aggregates/User";
import { Usecase } from "../Usecase";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { PasswordGateway } from "../../domain/gateways/PasswordGateway";
import { UserErrors } from "../../domain/errors/UserErrors";
import { IdentityGateway } from "../../domain/gateways/IdentityGateway";

export interface LoginWithEmailInput {
    email: string;
    password: string;
}

export interface LoginWithEmailOutput {
    user: User;
    token: string;
}

@injectable()
export class LoginWithEmail
    implements Usecase<LoginWithEmailInput, LoginWithEmailOutput>
{
    constructor(
        @inject(AppIdentifiers.userRepository)
        private userRepository: UserRepository,
        @inject(AppIdentifiers.passwordGateway)
        private passwordGateway: PasswordGateway,
        @inject(AppIdentifiers.identityGateway)
        private readonly _identityGateway: IdentityGateway
    ) {}
    async execute(request: LoginWithEmailInput): Promise<LoginWithEmailOutput> {
        const user = await this.userRepository.getByEmail(request.email);
        if (!user) {
            throw new UserErrors.InvalidPasswordOrEmail();
        }

        const passwordIsValid = await this.passwordGateway.compare(
            request.password,
            user.props.password
        );
        if (!passwordIsValid) {
            throw new UserErrors.InvalidPasswordOrEmail();
        }

        const { id, phone, email } = user.props;

        const token = await this._identityGateway.encode({
            id,
            email,
            phone,
        });

        user.loginWithEmail();

        return { user, token };
    }
}
