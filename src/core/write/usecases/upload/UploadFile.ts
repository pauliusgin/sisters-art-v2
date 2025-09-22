import { inject, injectable } from "inversify";
import {
  FileData,
  FileType,
  FileUploaded,
  FileUsage,
} from "../../../../messages";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { UploadsRepository } from "../../domain/repositories/UploadsRepository";
import { StorageGateway } from "../../domain/gateways/StorageGateway";
import { ImagesService } from "../../domain/services/ImageService";
import { EventDispatcher, MessageIdentifiers } from "ddd-messaging-bus";
import { Upload } from "../../domain/aggregates/Upload";
import { Usecase } from "../Usecase";
import { UploadErrors } from "../../domain/errors/UploadErrors";
import { v4 } from "uuid";

export interface UploadFileInput {
  file: FileData;
  userId: string;
  fileType: FileType;
  usage: FileUsage;
}

@injectable()
export class UploadFile implements Usecase<UploadFileInput, Upload> {
  constructor(
    @inject(AppIdentifiers.uploadsRepository)
    private readonly _uploadsRepository: UploadsRepository,
    @inject(AppIdentifiers.storageGateway)
    private readonly _storageGateway: StorageGateway,
    @inject(ImagesService)
    private readonly _imagesService: ImagesService,
    @inject(MessageIdentifiers.EventDispatcher)
    private readonly _eventDispatcher: EventDispatcher
  ) {}

  async execute(request: UploadFileInput): Promise<Upload> {
    const { file, userId, fileType, usage } = request;

    let convertedFile: {
      buffer: Buffer;
      mime: string;
    };

    if (fileType !== FileType.IMAGE) {
      throw new UploadErrors.InvalidFileFormat("File format not supported");
    }

    if (fileType === FileType.IMAGE) {
      await this._imagesService.validateImage(file);

      convertedFile = await this._imagesService.convertToWebp(file);
    }

    const path = this.buildPath({ userId, usage });

    const uploadedFile = await this._storageGateway.upload({
      buffer: convertedFile.buffer,
      path,
      contentType: convertedFile.mime,
    });

    const upload = Upload.upload({
      userId,
      fileType,
      usage,
      url: uploadedFile.url,
      token: uploadedFile.token,
      path,
    });

    await this._uploadsRepository.save(upload);

    const event = new FileUploaded({
      userId,
      url: upload.props.url,
    });
    await this._eventDispatcher.dispatch(event);

    console.log(`\x1bFile uploaded: ${upload.props.url}\x1b[0m`);

    return upload;
  }

  buildPath(input: { userId: string; usage: FileUsage }): string {
    const { usage } = input;
    const identifier = v4();

    return `uploads/${usage}/${identifier}`;
  }
}
