import { inject, injectable } from "inversify";
import { validateOrReject } from "class-validator";
import { Response } from "express";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import {
  Post,
  Req,
  Res,
  JsonController,
  UseBefore,
  Body,
} from "routing-controllers";
import { UploadFile } from "../../../core";
import { AuthenticatedUser } from "../../types/AuthenticatedUser";
import multer from "multer";
import { UploadFileCommand } from "./commands/UploadFileCommand";
import { UploadHiddenInput, UploadPreview } from "../../pageUI";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

@injectable()
@JsonController("/uploads")
export class UploadsController {
  constructor(
    @inject(UploadFile)
    private readonly _uploadFile: UploadFile,
    @inject(UploadPreview)
    private readonly _uploadPreview: UploadPreview,
    @inject(UploadHiddenInput)
    private readonly _uploadHiddenInput: UploadHiddenInput
  ) {}

  @UseBefore(AuthenticationMiddleware)
  @UseBefore(upload.single("file"))
  @Post("/")
  async uploadFile(
    @Req() req: AuthenticatedUser,
    @Res() res: Response,
    @Body() cmd: UploadFileCommand
  ) {
    const body = UploadFileCommand.setProperties(cmd);
    await validateOrReject(body);

    const { fileType, usage } = body;
    const { size, buffer } = req.file;

    const upload = await this._uploadFile.execute({
      userId: req.identity.id,
      fileType,
      usage,
      file: {
        size,
        buffer,
      },
    });

    const preview = await this._uploadPreview.execute(upload.props.url);
    const hiddenInput = await this._uploadHiddenInput.execute(upload.props.url);

    return res.status(201).send(preview + hiddenInput);
  }
}
