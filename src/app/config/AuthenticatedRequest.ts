import { Request } from "express";
import { UserIdentity } from "../../messages/types/UserIdentity";

export interface AuthenticatedRequest extends Request {
    identity: UserIdentity;
}
