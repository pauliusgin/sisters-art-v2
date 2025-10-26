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
import {
  DeleteArtwork,
  GetAllArtworks,
  GetArtworkById,
  UpdateArtwork,
} from "../../../core";
import { UpdateArtworkCommand } from "./commands/UpdateArtworkCommand";
import {
  ArtworkItem,
  ArtworkUpdateFormClosed,
  GalleryForGuest,
  GalleryForLoggedIn,
  UploadFormClosed,
} from "../../pageUI";
import { checkToken } from "../../utils/token";

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
    private readonly _galleryForLoggedIn: GalleryForLoggedIn,
    @inject(ArtworkItem)
    private readonly _artworkItem: ArtworkItem,
    @inject(ArtworkUpdateFormClosed)
    private readonly _artworkUpdateFormClosed: ArtworkUpdateFormClosed,
    @inject(GetArtworkById)
    private readonly _getArtworkById: GetArtworkById,
    @inject(GalleryForGuest)
    private readonly _galleryForGuest: GalleryForGuest
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

    const artworks = await this._getAllArtworks.execute();
    const gallery = await this._galleryForLoggedIn.execute(artworks);
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
    const { title, author, type, material, method, date } = body;

    const update = await this._updateArtwork.execute({
      artworkId,
      title,
      author,
      type,
      material,
      method,
      date,
    });

    const artwork = await this._getArtworkById.execute(update.props.id);
    const artworkItem = await this._artworkItem.execute(artwork);
    const updateFormClosed = await this._artworkUpdateFormClosed.execute();

    return res.status(200).send(artworkItem + updateFormClosed);
  }

  @UseBefore(AuthenticationMiddleware)
  @Delete("/:artworkId")
  async deleteArtwork(
    @Res() res: Response,
    @Param("artworkId") artworkId: string
  ) {
    await this._deleteArtwork.execute(artworkId);

    const updateFormClosed = await this._artworkUpdateFormClosed.execute();

    return res.status(200).send(updateFormClosed);
  }

  @Get("/")
  async getArtworks(@Req() req: Request, @Res() res: Response) {
    const artworks = await this._getAllArtworks.execute();

    const token = checkToken(req);
    if (!token) {
      const gallery = await this._galleryForGuest.execute(artworks);
      return res.status(200).send(gallery);
    }

    const gallery = await this._galleryForLoggedIn.execute(artworks);
    return res.status(200).send(gallery);
  }
}
