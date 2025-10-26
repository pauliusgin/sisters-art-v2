import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class LoginFormClosed implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `<div hx-swap-oob="outerHTML" id="login-form"></div>`;
  }
}
