import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class UploadHiddenInput implements Usecase<string, string> {
  constructor() {}

  async execute(fileUrl: string): Promise<string> {
    return `<input hx-swap-oob="outerHTML" type="hidden" name="fileUrl" id="file-url" value="${fileUrl}">`;
  }
}
