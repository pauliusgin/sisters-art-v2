import { inject, injectable } from "inversify";
import { Artwork } from "../../domain/aggregates/Artwork";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { Author } from "../../../../messages/types/Author";
import { ArtworkType } from "../../../../messages/types/ArtworkType";
import { ArtworkMethod } from "../../../../messages/types/ArtworkMethod";
import { ArtworkMaterial } from "../../../../messages/types/ArtworkMaterial";
import { StorageGateway } from "../../domain/gateways/StorageGateway";

export interface CreateArtworkInput {
    title: string;
    author: Author;
    type?: ArtworkType;
    method?: ArtworkMethod;
    material?: ArtworkMaterial;
    date?: Date;
    fileBuffer: Buffer;
    mimeType: string;
}

@injectable()
export class CreateArtwork implements Usecase<CreateArtworkInput, Artwork> {
    constructor(
        @inject(AppIdentifiers.artworkRepository)
        private readonly _artworkRepository: ArtworkRepository,
        @inject(AppIdentifiers.storageGateway)
        private readonly _storageGateway: StorageGateway
    ) {}

    async execute(request: CreateArtworkInput): Promise<Artwork> {
        const {
            title,
            author,
            type,
            method,
            material,
            fileBuffer,
            mimeType,
            date,
        } = request;

        const uploadedImage = await this._storageGateway.upload({
            fileBuffer,
            fileName: title,
            mimeType,
        });

        const artwork = Artwork.create({
            title,
            author,
            type,
            method,
            material,
            image: uploadedImage.url,
            date,
        });

        await this._artworkRepository.save(artwork);

        return artwork;
    }
}
