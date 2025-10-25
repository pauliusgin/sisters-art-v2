import { inject, injectable } from "inversify";
import { validateOrReject } from "class-validator";
import { Response, Request } from "express";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import {
  Post,
  Patch,
  Get,
  Delete,
  Req,
  Res,
  JsonController,
  UseBefore,
  Body,
  Param,
} from "routing-controllers";
import { CreateArtwork } from "../../../core/write/usecases/artwork/CreateArtwork";
import { CreateArtworkCommand } from "./commands/CreateArtworkCommand";
import { DeleteArtwork } from "../../../core/write/usecases/artwork/DeleteArtwork";
import { UpdateArtwork } from "../../../core/write/usecases/artwork/UpdateArtwork";
import { UpdateArtworkCommand } from "./commands/UpdateArtworkCommand";
import { GetAllArtworks } from "../../../core/read/queries/GetAllArtworks";
import { GalleryForLoggedIn } from "../../pageUI/GalleryForLoggedIn";
import { UploadFormClosed } from "../../pageUI/UploadFormClosed";

@injectable()
@JsonController("/artworks")
export class ArtworkController {
  constructor(
    @inject(CreateArtwork)
    private readonly _createArtwork: CreateArtwork,
    @inject(DeleteArtwork)
    private readonly _deleteArtwork: DeleteArtwork,
    @inject(UpdateArtwork)
    private readonly _updateArtwork: UpdateArtwork,
    @inject(GetAllArtworks)
    private readonly _getAllArtworks: GetAllArtworks,
    @inject(UploadFormClosed)
    private readonly _uploadFormClosed: UploadFormClosed,
    @inject(GalleryForLoggedIn)
    private readonly _galleryForLoggedIn: GalleryForLoggedIn
  ) {}

  @UseBefore(AuthenticationMiddleware)
  @Post("/")
  async createArtwork(@Res() res: Response, @Body() cmd: CreateArtworkCommand) {
    const body = CreateArtworkCommand.setProperties(cmd);
    await validateOrReject(body);
    const { title, author, type, material, method, date, fileUrl } = body;

    await this._createArtwork.execute({
      title,
      author,
      type,
      material,
      method,
      date,
      fileUrl,
    });

    const gallery = await this._galleryForLoggedIn.execute();
    const uploadFormClosed = await this._uploadFormClosed.execute();

    return res.status(201).send(gallery + uploadFormClosed);
  }

  @UseBefore(AuthenticationMiddleware)
  @Patch("/:artworkId")
  async updateArtwork(
    @Res() res: Response,
    @Param("artworkId") artworkId: string,
    @Body() cmd: UpdateArtworkCommand
  ) {
    const body = UpdateArtworkCommand.setProperties(cmd);
    await validateOrReject(body);
    const { title, author, type, material, method, date, fileUrl } = body;

    const result = await this._updateArtwork.execute({
      artworkId,
      title,
      author,
      type,
      material,
      method,
      date,
      fileUrl,
    });

    return res.status(200).send(result.props);
  }

  @UseBefore(AuthenticationMiddleware)
  @Delete("/:artworkId")
  async deleteArtwork(
    @Res() res: Response,
    @Param("artworkId") artworkId: string
  ) {
    await this._deleteArtwork.execute(artworkId);

    return res.sendStatus(200);
  }

  @UseBefore(AuthenticationMiddleware)
  @Get("/")
  async getArtworks(@Req() @Res() res: Response) {
    const result = await this._getAllArtworks.execute();

    return res.status(200).send(result);
  }
}
