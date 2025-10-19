import { injectable } from "inversify";
import { Usecase } from "../../core/write/usecases/Usecase";

@injectable()
export class LoginForm implements Usecase<void, string> {
  constructor() {}

  async execute(): Promise<string> {
    const loginForm = `
    <div
      id="login-form"
      class="fixed inset-0 z-20 grid place-content-center bg-[rgba(201,180,158,0.4)] backdrop-blur-[3px] p-4"
      aria-modal="true">
      <div
        class="w-full max-w-md border border-black rounded-md bg-[rgba(201,180,158,0.8)] p-6 shadow-lg">
        <div class="flex items-start justify-between">
          <h2 class="text-clamp-h2 font-merienda text-center text-shadow-sm">
            Login
          </h2>

          <button
            hx-get="/ui/login-form-closed"
            hx-trigger="click"
            hx-target="#login-form"
            hx-swap="outerHTML"
            type="button"
            class="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
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
          hx-post="/users/login"
          hx-target="#user-controls"
          hx-swap="innerHTML"
          >
          <div class="mt-4">
            <label class="mt-4 block">
              <input
                type="text"
                name="email"
                id="email"
                required
                placeholder="email"
                class="font-merienda mt-0.5 mb-[0.5rem] w-full px-2 py-[0.3rem] bg-[rgba(240,235,230,0.8)] rounded-md border-gray-300 shadow-sm focus:outline-none sm:text-sm" />
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="password"
                class="font-merienda mt-0.5 w-full px-2 py-[0.3rem] rounded-md bg-[rgba(240,235,230,0.8)] border-gray-300 shadow-sm focus:outline-none sm:text-sm" />
            </label>
          </div>

          <div class="mt-6 flex justify-end gap-2">
            <button
              hx-get="/ui/login-form-closed"
              hx-trigger="click"
              hx-target="#login-form"
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

    return loginForm;
  }
}
