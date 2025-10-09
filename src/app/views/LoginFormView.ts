import { injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";

@injectable()
export class LoginFormView implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    const response = `<div class="bg-blue-400">Hello there too</div>`;

    return response;
  }
}
