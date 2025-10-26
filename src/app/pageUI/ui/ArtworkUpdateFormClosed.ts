import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class ArtworkUpdateFormClosed implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `<div hx-swap-oob="outerHTML" id="artwork-update-form"></div>`;
  }
}
