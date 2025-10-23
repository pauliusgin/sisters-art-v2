import ejs from "ejs";
import { inject, injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";
import { GetAllArtworks } from "../../core";
import { Author } from "../../messages";

@injectable()
export class Gallery implements Usecase<void, string> {
  constructor(
    @inject(GetAllArtworks)
    private readonly _getAllArtworks: GetAllArtworks
  ) {}

  async execute(): Promise<string> {
    const artworks = await this._getAllArtworks.execute();

    if (!artworks.length) {
      return `<p class="text-center text-clamp-p m-[1em,_0] p-[2rem] font-merienda text-shadow-sm">gallery is empty...</p>`;
    }

    const gallery = ejs.render(
      `
    <% artworks.forEach(a => { %>
      <div class="flex flex-col items-center text-center max-w-[20rem]">
        <img 
          class="max-w-[15rem] max-h-[15rem] rounded-md image-shadow mb-[1rem]" 
          src="<%= a.fileUrl %>" alt="<%= a.title %>"
          loading="lazy">
        <p class="text-xl font-merienda text-shadow-sm">
          <% if (a.author === "${Author.BOTH}") { %>
          <%= a.author %> (<%= a.authorAge[0] %> y/o and <%= a.authorAge[1] %> y/o)
      <% } else { %>
        <%= a.author %> (<%= a.authorAge[0] %> y/o)
      <% } %> </p>
        <p class="font-merienda text-shadow-sm">"<%= a.title %>"</p>
        <p class="font-merienda text-xs text-shadow-sm"><%= a.date.toISOString().slice(0, 10) %></p>
        <p class="font-merienda text-xs text-shadow-sm"><%= [a.type, a.material, a.method].filter(Boolean).join(", ") %></p>
      </div>
    <% }) %>`,
      { artworks }
    );

    return gallery;
  }
}
