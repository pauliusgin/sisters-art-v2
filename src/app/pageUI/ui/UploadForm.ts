import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class UploadForm implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    const uploadForm = `
    <div
      id="upload-form"
      class="fixed inset-0 z-[999] flex items-start lg:items-center justify-center  overflow-y-auto bg-[rgba(201,180,158,0.4)] backdrop-blur-[3px] p-4"
      aria-modal="true">
      <div
        class="w-full max-w-md border border-black rounded-md bg-[rgba(201,180,158,0.8)] p-6 shadow-lg relative my-8">
        <div class="flex items-start justify-between">
          <h2 class="text-clamp-h2 font-merienda text-center text-shadow-sm">
            Upload image
          </h2>

          <button
            hx-get="/ui/upload-form-closed"
            hx-trigger="click"
            hx-target="#upload-form"
            hx-swap="outerHTML"
            type="button"
            class="me-4 mt-3 rounded-full p-2 text-black-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-red-500 focus:rounded-[50%]"
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
        hx-post="/artworks"
        hx-target="#gallery-items"
        hx-swap="innerHTML"
        >
        <div class="mt-4">
        
          <div id="upload-preview"></div>
          <label class="block font-merienda text-xs">Image
            <input
              name="file"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              required
              id="file-input"
              hx-encoding="multipart/form-data"
              hx-vals='{"fileType": "image", "usage": "artwork"}'
              hx-post="/uploads"
              hx-target="#upload-preview"
              hx-swap="outerHTML"
              class="text-sm font-merienda mt-[0.5] mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-red-500 focus:rounded-md sm:text-sm">
            </input>
          </label>

          <label class="block font-merienda text-xs">Author
            <select
              name="author"
              required
              id="author-select"
              class="text-sm font-merienda mt-[0.5] mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-orange-500 focus:rounded-md sm:text-sm">
              <option value="">(please select)</option>
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
              required
              placeholder="(please select)"
              id="date-input"
              class="text-sm font-merienda mt-[0.5] mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-yellow-500 focus:rounded-md sm:text-sm">
            </input>
          </label>
          
          <label class="block font-merienda text-xs">Title
            <input
              type="text"
              name="title"
              id="title-input"
              placeholder="(optional)"
              class="text-sm mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-green-500 focus:rounded-md sm:text-sm" />
          </label>

            <label class="block font-merienda text-xs">Type
              <select
                name="type"
                id="type-select"
                class="text-sm font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-cyan-500 focus:rounded-md sm:text-sm">
                <option value="">(optional)</option>
                <option value="Drawing">Drawing</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Cardboard">Cardboard</option>
                <option value="Cardboard drawing">Cardboard drawing</option>
                <option value="Coloring">Coloring</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label class="block font-merienda text-xs">Method
              <select
                name="method"
                id="method-select"
                class="text-sm font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-blue-500 focus:rounded-md sm:text-sm">
                <option value="">(optional)</option>
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
              </select>
            </label>

            <label class="block font-merienda text-xs">Material
              <select
                name="material"
                id="material-select"
                class="text-sm font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md shadow-sm focus:outline-none border border-transparent focus:border-black focus:ring-1 focus:ring-purple-500 focus:rounded-md sm:text-sm">
                <option value="">(optional)</option>
                <option value="Paper">Paper</option>
                <option value="Cardboard">Cardboard</option>
                <option value="Clay">Clay</option>
                <option value="Playdough">Playdough</option>
                <option value="Digital">Digital</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <input type="hidden" name="fileUrl" id="file-url" value="">

          </div>

          <div class="mt-6 flex justify-end gap-2">
            <button
              hx-get="/ui/upload-form-closed"
              hx-trigger="click"
              hx-target="#upload-form"
              hx-swap="outerHTML"
              type="button"
              class="block border border-black rounded-md bg-none px-5 py-[0.3rem] text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-red-500 focus:rounded-md hover:text-red-500 hover:border-yellow-500">
              Cancel
            </button>

            <button
              type="submit"
              class="block border border-black rounded-md bg-none px-5 py-[0.3rem] text-sm font-medium text-black transition focus:outline-none focus:ring-1 focus:ring-green-500 focus:rounded-md hover:text-green-500 hover:border-blue-500">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

        `;

    return uploadForm;
  }
}
