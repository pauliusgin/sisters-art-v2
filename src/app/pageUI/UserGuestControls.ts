import { injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";

@injectable()
export class UserGuestControls implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `<div class="sm:flex sm:gap-4">
              <a
                id="login"
                class="block border border-black rounded-md bg-none px-5 py-2.5 text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-purple-500 focus:rounded-md hover:text-blue-500 hover:border-purple-500"
                href="#"
                hx-get="/ui/login-form"
                hx-trigger="click"
                hx-target="#login-form"
                hx-swap="outerHTML">
                Login
              </a>
            </div>`;
  }
}
