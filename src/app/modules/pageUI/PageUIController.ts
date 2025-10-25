import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { Res, JsonController, Get, Req } from "routing-controllers";
import { LoginForm } from "../../pageUI/LoginForm";
import { LoginFormClosed } from "../../pageUI/LoginFormClosed";
import { UserGuestControls } from "../../pageUI/UserGuestControls";
import { UserLoggedInControls } from "../../pageUI/UserLoggedInControls";
import { HamburgerMenuOpen } from "../../pageUI/HamburgerMenuOpen";
import { HamburgerMenuClosed } from "../../pageUI/HamburgerMenuClosed";
import { HamburgerButton } from "../../pageUI/HamburgerButton";
import { HamburgerButtonX } from "../../pageUI/HamburgerButtonX";
import { UploadForm } from "../../pageUI/UploadForm";
import { UploadFormClosed } from "../../pageUI/UploadFormClosed";
import { checkToken } from "../../utils/token";
import { GalleryForGuest } from "../../pageUI/GalleryForGuest";
import { GalleryForLoggedIn } from "../../pageUI/GalleryForLoggedIn";

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
    @inject(GalleryForGuest)
    private readonly _galleryForGuest: GalleryForGuest,
    @inject(GalleryForLoggedIn)
    private readonly _galleryForLoggedIn: GalleryForLoggedIn
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

  @Get("/gallery")
  async populateGallery(@Req() req: Request, @Res() res: Response) {
    const token = checkToken(req);

    if (!token) {
      const galleryForGuest = await this._galleryForGuest.execute();
      return res.status(200).send(galleryForGuest);
    }

    const galleryForLoggedIn = await this._galleryForLoggedIn.execute();
    return res.status(200).send(galleryForLoggedIn);
  }
}
