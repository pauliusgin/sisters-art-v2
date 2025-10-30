import { injectable } from "inversify";
import { DomainError, Usecase } from "../../../core/";

@injectable()
export class ErrorMessageClosed implements Usecase<DomainError, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `<div id="error-message" hx-swap-oob="outerHTML"></div>`;
  }
}
