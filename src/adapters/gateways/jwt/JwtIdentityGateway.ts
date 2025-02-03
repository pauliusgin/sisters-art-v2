import { injectable } from "inversify";
import { verify, sign, SignOptions } from "jsonwebtoken";
import { IdentityGateway } from "../../../core/write/domain/gateways/IdentityGateway";
import { UserIdentity } from "../../../messages/types/UserIdentity";

@injectable()
export class JwtIdentityGateway implements IdentityGateway {
    constructor(
        private readonly jwtSecret: string,
        private readonly config: SignOptions
    ) {}

    async encode(identity: UserIdentity): Promise<string> {
        return sign(
            {
                id: identity.id,
                phone: identity.phone,
                email: identity.email,
            },
            this.jwtSecret,
            this.config
        );
    }

    async verify(credential: string): Promise<UserIdentity> {
        const payload = verify(credential, this.jwtSecret) as any;
        return {
            phone: payload.phone,
            email: payload.email,
            id: payload.id,
        };
    }
}
