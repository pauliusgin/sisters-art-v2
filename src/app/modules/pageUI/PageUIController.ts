import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import {
  Res,
  JsonController,
  Get,
  Req,
  UseBefore,
  Post,
  Body,
} from "routing-controllers";
import {
  ArtworkUpdateForm,
  ArtworkUpdateFormClosed,
  HamburgerButton,
  HamburgerButtonX,
  HamburgerMenuOpen,
  LoginForm,
  LoginFormClosed,
  UploadForm,
  UploadFormClosed,
  UserGuestControls,
  UserLoggedInControls,
} from "../../pageUI";
import { checkToken } from "../../utils/token";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import { validateOrReject } from "class-validator";
import { ArtworkIdCommand } from "../../pageUI/commands/ArtworkIdCommand";
import { HamburgerMenuClosed } from "../../pageUI/ui/HamburgerMenuClosed";
import { GetArtworkById } from "../../../core";

@injectable()
@JsonController("/ui")
export class PageUIController {
  constructor(
    @inject(LoginForm)
    private readonly _loginForm: LoginForm,
    @inject(LoginFormClosed)
    private readonly _loginFormClose: LoginFormClosed,
    @inject(UserGuestControls)
    private readonly _userGuestControls: UserGuestControls,
    @inject(UserLoggedInControls)
    private readonly _userLoggedInControls: UserLoggedInControls,
    @inject(HamburgerMenuOpen)
    private readonly _hamburgerMenuOpen: HamburgerMenuOpen,
    @inject(HamburgerMenuClosed)
    private readonly _hamburgerMenuClosed: HamburgerMenuClosed,
    @inject(HamburgerButton)
    private readonly _hamburgerButton: HamburgerButton,
    @inject(HamburgerButtonX)
    private readonly _hamburgerButtonX: HamburgerButtonX,
    @inject(UploadForm)
    private readonly _uploadForm: UploadForm,
    @inject(UploadFormClosed)
    private readonly _uploadFormClosed: UploadFormClosed,
    @inject(ArtworkUpdateForm)
    private readonly _artworkUpdateForm: ArtworkUpdateForm,
    @inject(ArtworkUpdateFormClosed)
    private readonly _artworkUpdateFormClosed: ArtworkUpdateFormClosed,
    @inject(GetArtworkById)
    private readonly _getArtworkById: GetArtworkById
  ) {}

  @Get("/login-form")
  async openLogInForm(@Res() res: Response) {
    const loginForm = await this._loginForm.execute();

    return res.status(200).send(loginForm);
  }

  @Get("/login-form-closed")
  async closeLogInForm(@Res() res: Response) {
    const loginFormClosed = await this._loginFormClose.execute();

    return res.status(200).send(loginFormClosed);
  }

  @Get("/user-controls")
  async showUserControls(@Req() req: Request, @Res() res: Response) {
    const token = checkToken(req);

    if (!token) {
      const userGuestControls = await this._userGuestControls.execute();
      return res.status(200).send(userGuestControls);
    }

    const userLoggedInControls = await this._userLoggedInControls.execute();
    return res.status(200).send(userLoggedInControls);
  }

  @Get("/hamburger-menu")
  async showHamburgerMenu(@Res() res: Response) {
    const hamburgerMenu = await this._hamburgerMenuOpen.execute();
    const hamburgerButtonX = await this._hamburgerButtonX.execute();

    return res.status(200).send(hamburgerMenu + hamburgerButtonX);
  }

  @Get("/hamburger-menu-closed")
  async closeHamburgerMenu(@Res() res: Response) {
    const hamburgerMenuClosed = await this._hamburgerMenuClosed.execute();
    const hamburgerButton = await this._hamburgerButton.execute();

    return res.status(200).send(hamburgerMenuClosed + hamburgerButton);
  }

  @UseBefore(AuthenticationMiddleware)
  @Get("/upload-form")
  async openUploadForm(@Res() res: Response) {
    const uploadForm = await this._uploadForm.execute();

    return res.status(200).send(uploadForm);
  }

  @Get("/upload-form-closed")
  async closeUploadForm(@Res() res: Response) {
    const uploadFormClosed = await this._uploadFormClosed.execute();

    return res.status(200).send(uploadFormClosed);
  }

  @UseBefore(AuthenticationMiddleware)
  @Post("/artwork-update-form")
  async artworkUpdateForm(@Res() res: Response, @Body() cmd: ArtworkIdCommand) {
    const body = ArtworkIdCommand.setProperties(cmd);
    await validateOrReject(body);

    const { artworkId } = body;

    const artwork = await this._getArtworkById.execute(artworkId);

    const artworkUpdateUpdateForm = await this._artworkUpdateForm.execute(
      artwork
    );

    return res.status(200).send(artworkUpdateUpdateForm);
  }

  @Get("/artwork-update-form-closed")
  async updateFormClosed(@Res() res: Response) {
    const artworkUpdateFormClosed =
      await this._artworkUpdateFormClosed.execute();

    return res.status(200).send(artworkUpdateFormClosed);
  }
}
