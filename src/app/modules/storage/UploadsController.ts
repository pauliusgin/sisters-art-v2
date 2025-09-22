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
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

@injectable()
@UseBefore(upload.single("file"))
@JsonController("/uploads")
export class UploadsController {
  constructor(
    @inject(UploadFile)
    private readonly _uploadFile: UploadFile
  ) {}

  @UseBefore(AuthenticationMiddleware)
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

    const result = await this._uploadFile.execute({
      userId: req.identity.id,
      fileType,
      usage,
      file: {
        size,
        buffer,
      },
    });

    return res.status(201).send({ url: result.props.url });
  }
}
