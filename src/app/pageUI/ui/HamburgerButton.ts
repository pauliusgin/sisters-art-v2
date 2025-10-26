import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class HamburgerButton implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `
    <button
          hx-get="/ui/hamburger-menu"
          hx-trigger="click"
          hx-target="#hamburger-menu"
          hx-swap-oob="outerHTML"
          id="hamburger-button"
          class="block border border-black rounded-md bg-none p-2.5 text-black transition focus:outline-none focus:ring-1 focus:ring-blue-500 focus:rounded-md hover:text-purple-500/75 hover:border-blue-500 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>`;
  }
}
