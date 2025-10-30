import ejs from "ejs";
import { injectable } from "inversify";
import { DomainError, Usecase } from "../../../core/";

@injectable()
export class ErrorMessage implements Usecase<DomainError, string> {
  constructor() {}

  async execute(error: DomainError): Promise<string> {
    const artworkItem = ejs.render(
      `<div id="error-message" class="my-[0.5rem]">
        <p class="text-start text-sm text-red-500 font-merienda text-shadow-sm"><%= error.message %></p>
        <p class="text-start text-xs text-red-500 font-merienda text-shadow-sm"><%= error.cause %></p>
      </div>
      `,
      { error }
    );

    return artworkItem;
  }
}
