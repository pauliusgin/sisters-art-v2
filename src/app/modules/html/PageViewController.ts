import { inject, injectable } from "inversify";
import { Response } from "express";
import { Get, Res, JsonController } from "routing-controllers";
import { LoginFormView } from "../../views/LoginFormView";

@injectable()
@JsonController("/view")
export class PageViewController {
  constructor(
    @inject(LoginFormView)
    private readonly _loginForm: LoginFormView
  ) {}

  @Get("/login-form")
  async getLogInForm(@Res() res: Response) {
    const view = await this._loginForm.execute();

    return res.status(200).send(view);
  }
}
