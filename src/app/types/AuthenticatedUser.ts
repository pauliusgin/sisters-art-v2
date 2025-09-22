import { Request } from "express";
import { UserIdentity } from "../../messages/types/UserIdentity";

export interface AuthenticatedUser extends Request {
    identity: UserIdentity;
    customerId?: string;
}
