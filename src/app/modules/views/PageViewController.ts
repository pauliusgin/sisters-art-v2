import { inject, injectable } from "inversify";
import { Response } from "express";
import { Res, JsonController, Get } from "routing-controllers";
import { LoginFormView } from "../../views/LoginFormView";
import { GalleryView } from "../../views/GalleryView";

@injectable()
@JsonController("/views")
export class PageViewController {
  constructor(
    @inject(LoginFormView)
    private readonly _loginForm: LoginFormView,
    @inject(GalleryView)
    private readonly _galleryView: GalleryView
  ) {}

  @Get("/login-form")
  async getLogInForm(@Res() res: Response) {
    const view = await this._loginForm.execute();

    return res.status(200).send(view);
  }

  @Get("/gallery")
  async getGallery(@Res() res: Response) {
    const view = await this._galleryView.execute();

    return res.status(200).send(view);
  }
}
