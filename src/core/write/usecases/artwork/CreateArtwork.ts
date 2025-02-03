import { inject, injectable } from "inversify";
import { Artwork } from "../../domain/aggregates/Artwork";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { Author } from "../../../../messages/types/Author";
import { ArtworkType } from "../../../../messages/types/ArtworkType";
import { ArtworkMethod } from "../../../../messages/types/ArtworkMethod";
import { ArtworkMaterial } from "../../../../messages/types/ArtworkMaterial";

export interface CreateArtworkInput {
    title?: string;
    author: Author;
    type?: ArtworkType;
    method?: ArtworkMethod;
    material?: ArtworkMaterial;
    image: string;
    date: Date;
}

@injectable()
export class CreateArtwork implements Usecase<CreateArtworkInput, Artwork> {
    constructor(
        @inject(AppIdentifiers.artworkRepository)
        private readonly _artworkRepository: ArtworkRepository
    ) {}

    async execute(request: CreateArtworkInput): Promise<Artwork> {
        const artwork = Artwork.create(request);

        await this._artworkRepository.save(artwork);

        return artwork;
    }
}
