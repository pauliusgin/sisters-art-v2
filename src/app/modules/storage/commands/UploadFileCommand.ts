import { Expose, plainToClass } from "class-transformer";
import { IsEnum } from "class-validator";
import { FileType, FileUsage } from "../../../../messages";

export class UploadFileCommand {
  @Expose()
  @IsEnum(FileType)
  fileType: FileType;

  @Expose()
  @IsEnum(FileUsage)
  usage: FileUsage;

  static setProperties(cmd: UploadFileCommand): UploadFileCommand {
    return plainToClass(UploadFileCommand, cmd, {
      excludeExtraneousValues: true,
    });
  }
}
