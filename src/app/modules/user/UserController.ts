import { Body, JsonController, Post, Res } from "routing-controllers";
import { inject, injectable } from "inversify";
import { Response } from "express";
import { LoginWithEmail } from "../../../core/write/usecases/user/LoginWithEmail";
import { LoginWithEmailCommand } from "./commands/LoginWithEmailCommand";
import { validateOrReject } from "class-validator";
import { SignUp } from "../../../core/write/usecases/user/SignUp";
import { SignUpCommand } from "./commands/SignUpCommand";
import { cookieOptions } from "../../config/config";
import { deleteToken, setToken } from "../../utils/token";
import { UserGuestControls } from "../../pageUI/UserGuestControls";
import { UserLoggedInControls } from "../../pageUI/UserLoggedInControls";
import { LoginFormClosed } from "../../pageUI/LoginFormClosed";
import { GalleryForGuest } from "../../pageUI/GalleryForGuest";
import { GalleryForLoggedIn } from "../../pageUI/GalleryForLoggedIn";

@injectable()
@JsonController("/users")
export class UserController {
  constructor(
    @inject(SignUp)
    private readonly _signUp: SignUp,
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
    private readonly _loginFormClosed: LoginFormClosed
  ) {}

  @Post("/signup")
  async signUp(@Res() res: Response, @Body() cmd: SignUpCommand) {
    const body = SignUpCommand.setProperties(cmd);
    await validateOrReject(body);
    const { email, password } = body;

    const response = await this._signUp.execute({
      email,
      password,
    });

    return res.status(201).send({ response });
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

    const userLoggedInControls = await this._userLoggedInControls.execute();
    const galleryForLoggedIn = await this._galleryForLoggedIn.execute();
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

    const guestControls = await this._userGuestControls.execute();
    const galleryForGuest = await this._galleryForGuest.execute();

    return res.status(200).send(guestControls + galleryForGuest);
  }
}
