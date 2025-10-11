import { inject, injectable } from "inversify";
import { Response } from "express";
import { Res, JsonController, Post } from "routing-controllers";
import { LoginFormView } from "../../views/LoginFormView";

@injectable()
@JsonController("/views")
export class PageViewController {
  constructor(
    @inject(LoginFormView)
    private readonly _loginForm: LoginFormView
  ) {}

  @Post("/login-form")
  async getLogInForm(@Res() res: Response) {
    const view = await this._loginForm.execute();

    return res.status(200).send(view);
  }
}
