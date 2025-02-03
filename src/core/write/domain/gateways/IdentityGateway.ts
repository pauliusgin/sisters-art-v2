import { UserIdentity } from "../../../../messages/types/UserIdentity";

export interface IdentityGateway {
    encode(identity: UserIdentity): Promise<string>;
    verify(credential: string): Promise<UserIdentity>;
}
