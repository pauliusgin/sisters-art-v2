import ejs from "ejs";
import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class DeleteButtonConfirmation implements Usecase<string, string> {
  constructor() {}

  async execute(artworkId: string): Promise<string> {
    return ejs.render(
      `
      <button
        hx-delete="/artworks/<%= artworkId %>"
        hx-trigger="click"
        hx-target="[data-artwork-item-id='<%= artworkId %>']"
        hx-swap="delete"
        hx-confirm="Are you really sure you want to delete this artwork? This action is irreversible."
        type="button"
        id="delete-button-confirmation"
        class="block self-start border border-black rounded-md bg-none px-5 py-[0.3rem] text-sm font-medium text-red-500 transition focus:outline-none focus:ring-1 focus:ring-red-500 focus:rounded-md hover:text-red-500 hover:border-yellow-500">
        Really delete
      </button>
    `,
      { artworkId }
    );
  }
}
