import { inject, injectable } from "inversify";
import { ArtworkCreated } from "../../../messages";
import { AttachUploadedFile } from "../../../core";
import { EventHandler } from "ddd-messaging-bus";

@injectable()
export class HandleArtworkCreated implements EventHandler {
  constructor(
    @inject(AttachUploadedFile)
    private readonly _attachUploadedFile: AttachUploadedFile
  ) {}

  async handle(domainEvent: ArtworkCreated): Promise<void> {
    const { usageEntityId, fileUrl } = domainEvent.props;

    await this._attachUploadedFile.execute({
      usageEntityId,
      fileUrl,
    });
  }
}
