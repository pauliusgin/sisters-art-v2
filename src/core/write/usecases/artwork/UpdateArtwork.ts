import { inject, injectable } from "inversify";
import { Artwork } from "../../domain/aggregates/Artwork";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { ArtworkErrors } from "../../domain/errors/ArtworkErrors";
import { ArtworkType } from "../../../../messages/types/ArtworkType";
import { ArtworkMethod } from "../../../../messages/types/ArtworkMethod";
import { ArtworkMaterial } from "../../../../messages/types/ArtworkMaterial";
import { Author } from "../../../../messages/types/Author";

export interface UpdateArtworkInput {
    artworkId: string;
    title?: string;
    author?: Author;
    type?: ArtworkType;
    method?: ArtworkMethod;
    material?: ArtworkMaterial;
    date?: Date;
}

@injectable()
export class UpdateArtwork implements Usecase<UpdateArtworkInput, Artwork> {
    constructor(
        @inject(AppIdentifiers.artworkRepository)
        private readonly _artworkRepository: ArtworkRepository
    ) {}

    async execute(request: UpdateArtworkInput): Promise<Artwork> {
        const { artworkId, title, author, type, method, material, date } =
            request;

        const artwork = await this._artworkRepository.getById(artworkId);

        if (!artwork) {
            throw new ArtworkErrors.ArtworkNotFound();
        }

        artwork.update({
            title,
            author,
            type,
            method,
            material,
            date,
        });

        await this._artworkRepository.save(artwork);

        return artwork;
    }
}
