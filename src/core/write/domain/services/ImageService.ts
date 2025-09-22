import { fileTypeFromBuffer } from "file-type";
import sharp = require("sharp");
import { injectable } from "inversify";
import { UploadErrors } from "../errors/UploadErrors";
import { FileData } from "../../../../messages";

@injectable()
export class ImagesService {
  static readonly allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  static readonly allowedImageSizeInMb = 10;
  static readonly allowedImageDimensionsInPixels = {
    height: 10000,
    width: 10000,
  };

  async validateImage(file: FileData): Promise<void> {
    const { size, buffer } = file;

    const { mime } = await fileTypeFromBuffer(new Uint8Array(buffer));
    if (!mime || !ImagesService.allowedImageTypes.includes(mime)) {
      throw new UploadErrors.InvalidFileFormat(
        `Image must one of the following formats: ${ImagesService.allowedImageTypes
          .slice()
          .join(", ")}`
      );
    }

    const allowedImageSizeInBytes =
      ImagesService.allowedImageSizeInMb * 1024 * 1024;
    if (size > allowedImageSizeInBytes) {
      throw new UploadErrors.UnableToUpload(
        `Allowed file size up to ${ImagesService.allowedImageSizeInMb} MB`
      );
    }

    const { width: maxWidth, height: maxHeight } =
      ImagesService.allowedImageDimensionsInPixels;
    const { width, height } = await sharp(buffer).metadata();

    if (width > maxWidth || height > maxHeight) {
      throw new UploadErrors.UnableToUpload(
        `Allowed image dimensions are: height ${maxHeight}, width: ${maxWidth}`
      );
    }
  }

  async convertToWebp(
    file: FileData
  ): Promise<{ buffer: Buffer; mime: string }> {
    const webpBuffer = await sharp(file.buffer).webp().toBuffer();

    return {
      buffer: webpBuffer,
      mime: "image/webp",
    };
  }
}
