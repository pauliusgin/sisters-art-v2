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
  ErrorMessage,
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
    private readonly _getAllArtworks: GetAllArtworks,
    @inject(ErrorMessage)
    private readonly _errorMessage: ErrorMessage
  ) {}

  @Post("/login")
  async loginWithEmail(
    @Res() res: Response,
    @Body() cmd: LoginWithEmailCommand
  ) {
    try {
      const body = LoginWithEmailCommand.setProperties(cmd);
      await validateOrReject(body);
      const { email, password } = body;

      const result = await this._loginWithEmail.execute({
        email,
        password,
      });
      setToken({
        res,
        token: result.token,
        cookieOptions,
      });

      const artworks = await this._getAllArtworks.execute();
      const galleryForLoggedIn = await this._galleryForLoggedIn.execute(
        artworks
      );
      const userLoggedInControls = await this._userLoggedInControls.execute();
      const loginFormClosed = await this._loginFormClosed.execute();

      return res
        .status(200)
        .send(userLoggedInControls + galleryForLoggedIn + loginFormClosed);
    } catch (error: any) {
      const errorMessage = await this._errorMessage.execute(error);
      return res.status(500).send(errorMessage);
    }
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
