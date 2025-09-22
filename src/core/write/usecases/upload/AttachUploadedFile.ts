import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { Upload } from "../../domain/aggregates/Upload";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { EventDispatcher, MessageIdentifiers } from "ddd-messaging-bus";
import { extractToken } from "../../utils/extractToken";
import { UploadErrors } from "../../domain/errors/UploadErrors";
import { FileStatus, FileAttached } from "../../../../messages";
import { UploadsRepository } from "../../domain/repositories/UploadsRepository";

export interface AttachUploadedFileInput {
  usageEntityId: string;
  fileUrl: string;
}

@injectable()
export class AttachUploadedFile
  implements Usecase<AttachUploadedFileInput, Upload | void>
{
  constructor(
    @inject(AppIdentifiers.uploadsRepository)
    private readonly _uploadsRepository: UploadsRepository,
    @inject(MessageIdentifiers.EventDispatcher)
    private readonly _eventDispatcher: EventDispatcher
  ) {}

  async execute(request: AttachUploadedFileInput): Promise<Upload | void> {
    const { usageEntityId, fileUrl } = request;

    const token = extractToken(fileUrl);

    if (!token) {
      throw new UploadErrors.UploadTokenNotFound();
    }

    const upload = await this._uploadsRepository.findByToken(token);
    if (!upload) {
      throw new UploadErrors.FileNotFound();
    }

    if (upload.props.status === FileStatus.ACTIVE) {
      return;
    }

    upload.attach(usageEntityId);

    const event = new FileAttached({
      usageEntityId,
      fileUrl,
    });

    await this._uploadsRepository.save(upload);
    await this._eventDispatcher.dispatch(event);
    console.log(`\x1b[34mFile attached: ${upload.props.url}\x1b[0m`);

    return upload;
  }
}
