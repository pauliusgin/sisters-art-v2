import { ExpressMiddlewareInterface } from "routing-controllers";
import { inject, injectable } from "inversify";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../config/AuthenticatedRequest";
import { AppIdentifiers } from "../../core/AppIdentifiers";
import { IdentityGateway } from "../../core/write/domain/gateways/IdentityGateway";

@injectable()
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
    constructor(
        @inject(AppIdentifiers.identityGateway)
        private readonly identityGateway: IdentityGateway
    ) {}

    async use(
        request: AuthenticatedRequest,
        response: Response,
        next?: NextFunction
    ) {
        const authorization = request.header("Authorization");
        if (!authorization) {
            return response.sendStatus(401);
        }
        const [, token] = authorization.split(" ");
        request.identity = await this.identityGateway.verify(token);

        next();
    }
}
