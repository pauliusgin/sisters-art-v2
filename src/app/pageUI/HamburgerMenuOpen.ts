import { injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";

@injectable()
export class HamburgerMenuOpen implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    return `
    <div 
      id="hamburger-menu" 
      class="pb-[1rem] pl-[1rem]">
      <ul class="space-y-1">
      <li>
        <a 
        href="#welcome" 
        class="text-black text-base text-shadow-sm px-4 hover:text-red-500/75 focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-red-500 focus:rounded-md">
          Welcome
        </a>
      </li>

      <li>
        <a
          href="#idea"
          class="text-black text-base text-shadow-sm px-4 hover:text-orange-500/75 border border-transparent focus:outline-none focus:border-black focus:ring-1 focus:ring-orange-500 focus:rounded-md"
        >
          The Idea
        </a>
      </li>

      <li>
        <a
          href="#whom"
          class="text-black text-base text-shadow-sm px-4 hover:text-yellow-500/75 border border-transparent focus:outline-none focus:border-black focus:ring-1 focus:ring-yellow-500 focus:rounded-md"
        >
          For Whom?
        </a>
      </li>

      <li>
        <a
          href="#about"
          class="text-black text-base text-shadow-sm px-4 hover:text-green-500/75 border border-transparent focus:outline-none focus:border-black focus:ring-1 focus:ring-green-500 focus:rounded-md"
        >
          About
        </a>
      </li>

      <li>
        <a
          href="#gallery"
          class="text-black text-base text-shadow-sm px-4 hover:text-cyan-500/75 border border-transparent focus:outline-none focus:border-black focus:ring-1 focus:ring-cyan-500 focus:rounded-md"
        >
          Gallery
        </a>
          </li>
        </ul>
      </a>
    </div>
`;
  }
}
