import { inject, injectable } from "inversify";
import { ArtworkUpdated } from "../../../messages";
import { AttachUploadedFile } from "../../../core";
import { EventHandler } from "ddd-messaging-bus";

@injectable()
export class HandleArtworkUpdated implements EventHandler {
  constructor(
    @inject(AttachUploadedFile)
    private readonly _attachUploadedFile: AttachUploadedFile
  ) {}

  async handle(domainEvent: ArtworkUpdated): Promise<void> {
    const { usageEntityId, fileUrl, previousFileUrl } = domainEvent.props;

    if (fileUrl !== previousFileUrl) {
      await this._attachUploadedFile.execute({
        usageEntityId,
        fileUrl,
      });
    }
  }
}
