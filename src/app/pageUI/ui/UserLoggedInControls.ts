import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class UserLoggedInControls implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `
    <div class="sm:flex sm:gap-4">
              <a
                id="upload"
                class="block border border-black rounded-md bg-none px-5 py-2.5 text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-purple-500 focus:rounded-md hover:text-blue-500 hover:border-purple-500"
                href="#"
                hx-get="/ui/upload-form"
                hx-trigger="click"
                hx-target="#upload-form"
                hx-swap="outerHTML">
                Upload
              </a>
            </div>
    <div class="sm:flex sm:gap-4">
              <a
                id="logout"
                class="block border border-black rounded-md bg-none px-5 py-2.5 text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-purple-500 focus:rounded-md hover:text-blue-500 hover:border-purple-500"
                href="#"
                hx-post="/users/logout"
                hx-trigger="click"
                hx-target="#user-controls"
                hx-swap="innerHTML">
                Logout
              </a>
            </div>`;
  }
}
