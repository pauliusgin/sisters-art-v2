import { Body, JsonController, Post, Res } from "routing-controllers";
import { inject, injectable } from "inversify";
import { Response } from "express";
import { LoginWithEmail } from "../../../core/write/usecases/user/LoginWithEmail";
import { LoginWithEmailCommand } from "./commands/LoginWithEmailCommand";
import { validateOrReject } from "class-validator";
import { SignUp } from "../../../core/write/usecases/user/SignUp";
import { SignUpCommand } from "./commands/SignUpCommand";

@injectable()
@JsonController("/users")
export class UserController {
    constructor(
        @inject(SignUp)
        private readonly _signUp: SignUp,
        @inject(LoginWithEmail)
        private readonly _loginWithEmail: LoginWithEmail
    ) {}

    @Post("/signup")
    async signUp(@Res() res: Response, @Body() cmd: SignUpCommand) {
        const body = SignUpCommand.setProperties(cmd);
        await validateOrReject(body);
        const { email, password } = body;

        const result = await this._signUp.execute({
            email,
            password,
        });

        return res.status(201).send(result);
    }

    @Post("/login")
    async loginWithEmail(
        @Res() res: Response,
        @Body() cmd: LoginWithEmailCommand
    ) {
        const body = LoginWithEmailCommand.setProperties(cmd);
        await validateOrReject(body);
        const { email, password } = body;

        const result = await this._loginWithEmail.execute({
            email,
            password,
        });

        return res.status(200).send(result);
    }
}
