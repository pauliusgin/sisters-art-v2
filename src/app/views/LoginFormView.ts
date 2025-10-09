import { injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";

@injectable()
export class LoginFormView implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    const wildButton = `
        <button
          id="this-button"
          type="button"
          hx-get="/views/login-form"
          hx-trigger="click"
          hx-target="#.wild-button"
          hx-swap="outerHTML"
          class="focus:outline-none text-pink font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-white w-50">
          Le Wild Element Appears..!
        </button>
`;

    return wildButton;
  }
}
