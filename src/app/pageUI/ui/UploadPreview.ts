import ejs from "ejs";
import { injectable } from "inversify";
import { Usecase } from "../../../core";

@injectable()
export class UploadPreview implements Usecase<string, string> {
  constructor() {}

  async execute(fileUrl: string): Promise<string> {
    return ejs.render(
      `
    <div 
      hx-swap-oob="outerHTML" 
      class="flex flex-column justify-center"
      id="upload-preview">
      <img src="<%= fileUrl %>" 
        class="max-w-[10rem] max-h-[10rem] rounded-md image-shadow mb-[1rem]" 
        alt="preview"
        id="preview-mage"
        >
    </div>`,
      { fileUrl }
    );
  }
}
