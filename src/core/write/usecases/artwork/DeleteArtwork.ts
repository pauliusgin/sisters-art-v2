import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";
import { StorageGateway } from "../../domain/gateways/StorageGateway";

@injectable()
export class DeleteArtwork implements Usecase<string, void> {
    constructor(
        @inject(AppIdentifiers.artworkRepository)
        private readonly _artworkRepository: ArtworkRepository,
        @inject(AppIdentifiers.storageGateway)
        private readonly _storageGateway: StorageGateway
    ) {}

    async execute(artworkId: string): Promise<void> {
        const artwork = await this._artworkRepository.getById(artworkId);
        if (!artwork) {
            return;
        }

        await this._storageGateway.delete(artwork.props.image);

        await this._artworkRepository.delete(artworkId);

        return;
    }
}
