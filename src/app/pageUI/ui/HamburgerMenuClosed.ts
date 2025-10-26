import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class HamburgerMenuClosed implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `<div hx-swap-oob="outerHTML" id="hamburger-menu"></div>`;
  }
}
