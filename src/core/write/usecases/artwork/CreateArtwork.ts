import { inject, injectable } from "inversify";
import { Artwork } from "../../domain/aggregates/Artwork";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { Author } from "../../../../messages/types/Author";
import {
  ArtworkCreated,
  ArtworkMaterial,
  ArtworkMethod,
  ArtworkType,
} from "../../../../messages";
import { EventDispatcher, MessageIdentifiers } from "ddd-messaging-bus";

export interface CreateArtworkInput {
  author: Author;
  title?: string;
  type?: ArtworkType;
  method?: ArtworkMethod;
  material?: ArtworkMaterial;
  date: Date;
  fileUrl: string;
}

@injectable()
export class CreateArtwork implements Usecase<CreateArtworkInput, Artwork> {
  constructor(
    @inject(AppIdentifiers.artworkRepository)
    private readonly _artworkRepository: ArtworkRepository,
    @inject(MessageIdentifiers.EventDispatcher)
    private readonly _eventDispatcher: EventDispatcher
  ) {}

  async execute(request: CreateArtworkInput): Promise<Artwork> {
    const { title, author, type, method, material, fileUrl, date } = request;

    const artwork = Artwork.create({
      title,
      author,
      type,
      method,
      material,
      fileUrl,
      date,
    });

    const event = new ArtworkCreated({
      usageEntityId: artwork.props.id,
      fileUrl,
    });

    await this._artworkRepository.save(artwork);
    await this._eventDispatcher.dispatch(event);
    console.log(`\x1b[34mArtwork created: ${title}: ${fileUrl}\x1b[0m`);

    return artwork;
  }
}
