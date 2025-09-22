import { inject, injectable } from "inversify";
import { Artwork } from "../../domain/aggregates/Artwork";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { ArtworkErrors } from "../../domain/errors/ArtworkErrors";
import {
  ArtworkMaterial,
  ArtworkMethod,
  ArtworkType,
  ArtworkUpdated,
  Author,
} from "../../../../messages";
import { EventDispatcher, MessageIdentifiers } from "ddd-messaging-bus";

export interface UpdateArtworkInput {
  artworkId: string;
  title?: string;
  author?: Author;
  type?: ArtworkType;
  method?: ArtworkMethod;
  material?: ArtworkMaterial;
  fileUrl?: string;
  date?: Date;
}

@injectable()
export class UpdateArtwork implements Usecase<UpdateArtworkInput, Artwork> {
  constructor(
    @inject(AppIdentifiers.artworkRepository)
    private readonly _artworkRepository: ArtworkRepository,
    @inject(MessageIdentifiers.EventDispatcher)
    private readonly _eventDispatcher: EventDispatcher
  ) {}

  async execute(request: UpdateArtworkInput): Promise<Artwork> {
    const { artworkId, title, author, type, method, material, fileUrl, date } =
      request;

    const artwork = await this._artworkRepository.getById(artworkId);
    if (!artwork) {
      throw new ArtworkErrors.ArtworkNotFound();
    }

    const previousFileUrl = artwork.props.fileUrl;

    artwork.update({
      title,
      author,
      type,
      method,
      material,
      fileUrl,
      date,
    });

    const event = new ArtworkUpdated({
      usageEntityId: artwork.props.id,
      fileUrl,
      previousFileUrl,
    });

    await this._artworkRepository.save(artwork);
    await this._eventDispatcher.dispatch(event);
    console.log(`\x1b[34mArtwork updated: ${title}: ${fileUrl}\x1b[0m`);

    return artwork;
  }
}
