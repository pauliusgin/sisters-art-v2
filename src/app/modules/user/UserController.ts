import { Body, JsonController, Post, Res } from "routing-controllers";
import { inject, injectable } from "inversify";
import { Response } from "express";
import { LoginWithEmail } from "../../../core/write/usecases/user/LoginWithEmail";
import { LoginWithEmailCommand } from "./commands/LoginWithEmailCommand";
import { validateOrReject } from "class-validator";
import { cookieOptions } from "../../config/config";
import { deleteToken, setToken } from "../../utils/token";
import {
  GalleryForGuest,
  GalleryForLoggedIn,
  LoginFormClosed,
  UserGuestControls,
  UserLoggedInControls,
} from "../../pageUI";
import { GetAllArtworks } from "../../../core";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(
    @inject(LoginWithEmail)
    private readonly _loginWithEmail: LoginWithEmail,
    @inject(UserGuestControls)
    private readonly _userGuestControls: UserGuestControls,
    @inject(UserLoggedInControls)
    private readonly _userLoggedInControls: UserLoggedInControls,
    @inject(GalleryForGuest)
    private readonly _galleryForGuest: GalleryForGuest,
    @inject(GalleryForLoggedIn)
    private readonly _galleryForLoggedIn: GalleryForLoggedIn,
    @inject(LoginFormClosed)
    private readonly _loginFormClosed: LoginFormClosed,
    @inject(GetAllArtworks)
    private readonly _getAllArtworks: GetAllArtworks
  ) {}

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

    const artworks = await this._getAllArtworks.execute();
    const galleryForLoggedIn = await this._galleryForLoggedIn.execute(artworks);
    const userLoggedInControls = await this._userLoggedInControls.execute();
    const loginFormClosed = await this._loginFormClosed.execute();

    setToken({
      res,
      token: result.token,
      cookieOptions,
    });

    return res
      .status(200)
      .send(userLoggedInControls + galleryForLoggedIn + loginFormClosed);
  }

  @Post("/logout")
  async logout(@Res() res: Response) {
    deleteToken({ res });

    const artworks = await this._getAllArtworks.execute();
    const galleryForGuest = await this._galleryForGuest.execute(artworks);
    const guestControls = await this._userGuestControls.execute();

    return res.status(200).send(guestControls + galleryForGuest);
  }
}
