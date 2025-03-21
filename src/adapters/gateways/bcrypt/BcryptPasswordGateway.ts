import { injectable } from "inversify";
import { PasswordGateway } from "../../../core/write/domain/gateways/PasswordGateway";
import { hash, compare } from "bcryptjs";

@injectable()
export class BcryptPasswordGateway implements PasswordGateway {
    async encrypt(password: string): Promise<string> {
        return hash(password, 10);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return compare(password, hash);
    }
}
