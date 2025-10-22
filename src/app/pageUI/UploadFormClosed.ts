import { injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";

@injectable()
export class UploadFormClosed implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `<div hx-swap-oob="outerHTML" id="upload-form"></div>`;
  }
}
