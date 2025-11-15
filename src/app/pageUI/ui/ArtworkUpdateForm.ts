import ejs from "ejs";
import { injectable } from "inversify";
import { ArtworkReadModel, Usecase } from "../../../core";

@injectable()
export class ArtworkUpdateForm implements Usecase<ArtworkReadModel, string> {
  constructor() {}

  async execute(artwork: ArtworkReadModel): Promise<string> {
    const artworkUpdateForm = ejs.render(
      `
    <div
      id="artwork-update-form"
      class="fixed inset-0 z-[999] flex items-start lg:items-center justify-center  overflow-y-auto bg-[rgba(201,180,158,0.4)] backdrop-blur-[3px] p-4"
      aria-modal="true">
      <div
        class="w-full max-w-md border border-black rounded-md bg-[rgba(201,180,158,0.8)] p-6 shadow-lg relative my-8">
        <div class="flex items-start justify-between">
          <h2 class="text-clamp-h2 font-merienda text-center text-shadow-sm">
            Update
          </h2>

          <button
            hx-get="/ui/artwork-update-form-closed"
            hx-trigger="click"
            hx-target="#artwork-update-form"
            hx-swap="outerHTML"
            type="button"
            class="rounded-full p-2 text-black-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-red-500 focus:rounded-[50%]"
            aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form 
        hx-patch="/artworks/<%= artwork.id %>"
        hx-target="[data-artwork-item-id='<%= artwork.id %>']"
        hx-target-5*="#error-message"
        hx-swap="outerHTML"
        >
        <div class="mt-4">
        
          <div 
            class="flex flex-column justify-center"
            id="upload-preview">
            <img src="<%= artwork.fileUrl %>" 
              class="max-w-[10rem] max-h-[10rem] rounded-md image-shadow mb-[1rem]" 
              alt="preview"
              id="preview-mage"
              >
          </div>

          <label class="block font-merienda text-xs">Author
            <select
              name="author"
              id="author-select"
              class="text-sm font-merienda mt-[0.5] mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-orange-500 focus:rounded-md sm:text-sm">
              <option value="<%= artwork.author %>"><%= artwork.author %></option>
              <option value="Viltautė">Viltautė</option>
              <option value="Jogailė">Jogailė</option>
              <option value="Viltautė and Jogailė">Viltautė and Jogailė</option>
            </select>
          </label>

          <label class="block font-merienda text-xs">Creation date
            <input
              name="date"
              type="date"
              min="2021-01-01"
              value="<%= artwork.date.toISOString().slice(0, 10) %>"
              id="date-input"
              class="text-sm font-merienda mt-[0.5] mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-yellow-500 focus:rounded-md sm:text-sm">
            </input>
          </label>
          
          <label class="block font-merienda text-xs">Title
            <input
              type="text"
              name="title"
              id="title-input"
              placeholder="Optional"
              value="<%= artwork.title ?? "" %>"
              class="text-sm mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-green-500 focus:rounded-md sm:text-sm" />
          </label>

            <label class="block font-merienda text-xs">Type
              <select
                name="type"
                id="type-select"
                class="text-sm font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-cyan-500 focus:rounded-md sm:text-sm">
                <option value="<%= artwork.type %>"><%= artwork.type ?? "(optional)"%></option>
                <option value="Drawing">Drawing</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Cardboard">Cardboard</option>
                <option value="Cardboard drawing">Cardboard drawing</option>
                <option value="Coloring">Coloring</option>
                <option value="Collage">Collage</option>
                <option value="Other">Other</option>
                <option value="">(remove type)</option>
              </select>
            </label>

            <label class="block font-merienda text-xs">Method
              <select
                name="method"
                id="method-select"
                class="text-sm font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-blue-500 focus:rounded-md sm:text-sm">
                <option value="<%= artwork.method %>"><%= artwork.method ?? "(optional)"%></option>
                <option value="Watercolor">Watercolor</option>
                <option value="Felt-tip pen">Felt tip pen</option>
                <option value="Pencil">Pencil</option>
                <option value="Crayon">Crayon</option>
                <option value="Gouache">Gouache</option>
                <option value="Moulding">Moulding</option>
                <option value="Cut-and-paste">Cut and paste</option>
                <option value="Digital">Digital</option>
                <option value="Finger paint">Finger paint</option>
                <option value="Other">Other</option>
                <option value="">(remove method)</option>
              </select>
            </label>

            <label class="block font-merienda text-xs">Material
              <select
                name="material"
                id="material-select"
                class="text-sm font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-purple-500 focus:rounded-md sm:text-sm">
                <option value="<%= artwork.material %>"><%= artwork.material ?? "(optional)"%></option>
                <option value="Paper">Paper</option>
                <option value="Cardboard">Cardboard</option>
                <option value="Clay">Clay</option>
                <option value="Playdough">Playdough</option>
                <option value="Digital">Digital</option>
                <option value="Other">Other</option>
                <option value="">(remove material)</option>
              </select>
            </label>

          </div>

          <div class="mt-6 flex justify-between gap-2">
            <div>
              <button
                hx-post="/ui/delete-button-confirmation"
                hx-trigger="click"
                hx-target="#delete-button"
                hx-swap="outerHTML"
                hx-confirm="Are you sure you want to delete this artwork?"
                hx-vals='{"artworkId": "<%= artwork.id %>"}'
                type="button"
                id="delete-button"
                class="block self-start border border-black rounded-md bg-none px-5 py-[0.3rem] text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-red-500 focus:rounded-md hover:text-red-500 hover:border-yellow-500">
                Delete
              </button>
            </div>
            <div class="flex gap-2">
              <button
                hx-get="/ui/artwork-update-form-closed"
                hx-trigger="click"
                hx-target="#artwork-update-form"
                hx-swap="outerHTML"
                type="button"
                class="block border border-black rounded-md bg-none px-5 py-[0.3rem] text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-red-500 focus:rounded-md hover:text-pink-500 hover:border-purple-500">
                Cancel
              </button>

              <button
                type="submit"
                class="block border border-black rounded-md bg-none px-5 py-[0.3rem] text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-green-500 focus:rounded-md hover:text-green-500 hover:border-blue-500">
                Submit
              </button>
            </div>
          </div>
          <div id="error-message"></div>
        </form>
      </div>
    </div>

        `,
      { artwork }
    );

    return artworkUpdateForm;
  }
}
