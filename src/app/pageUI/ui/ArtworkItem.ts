import ejs from "ejs";
import { injectable } from "inversify";
import { ArtworkReadModel, Usecase } from "../../../core/";
import { Author } from "../../../messages";

@injectable()
export class ArtworkItem implements Usecase<ArtworkReadModel, string> {
  constructor() {}

  async execute(artwork: ArtworkReadModel): Promise<string> {
    const artworkItem = ejs.render(
      `
      <div 
        data-artwork-item-id="<%= artwork.id %>" 
        class="flex flex-col group items-center text-center max-w-[20rem]">
        <div class="relative inline-block">        
          <img 
          class="max-w-[15rem] max-h-[15rem] rounded-md image-shadow mb-[1rem]" 
          src="<%= artwork.fileUrl %>" alt="<%= artwork.title %>"
          loading="lazy">
          <button        
            hx-post="ui/artwork-update-form"
            hx-target="#artwork-update-form"
            hx-swap="outerHTML"
            hx-vals='{"artworkId": "<%= artwork.id %>"}'
            type="button"
            id="artwork-update-button"
            class="z-[20] absolute top-0 right-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-full p-1 m-1 text-gray-400 group-hover:bg-gray-50 group-hover:border-yellow-500 group-hover:text-green-500 focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-red-500 focus:rounded-[50%]"
            aria-label="Edit">
            <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path
            d="M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z"
            fill="currentColor"
            />
            <path
            d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
            fill="currentColor"
            />
            <path
            d="M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z"
            fill="currentColor"
            />
            </svg>
          </button>
        </div>
        <p class="text-xl font-merienda text-shadow-sm">
          <% if (artwork.author === "${Author.BOTH}") { %>
          <%= artwork.author %> (<%= artwork.authorAge[0] %> y/o and <%= artwork.authorAge[1] %> y/o)
      <% } else { %>
        <%= artwork.author %> (<%= artwork.authorAge[0] %> y/o)
      <% } %> </p>
        <p class="font-merienda text-shadow-sm">"<%= artwork.title %>"</p>
        <p class="font-merienda text-xs text-shadow-sm"><%= artwork.date.toISOString().slice(0, 10) %></p>
        <p class="font-merienda text-xs text-shadow-sm"><%= [artwork.type, artwork.material, artwork.method].filter(Boolean).join(", ") %></p>
        <p type="hidden" value="<%= artwork.id %>" ></p>
      </div>
        `,
      { artwork }
    );

    return artworkItem;
  }
}
