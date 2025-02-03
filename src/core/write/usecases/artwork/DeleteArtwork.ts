import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { ArtworkRepository } from "../../domain/repositories/ArtworkRepository";

@injectable()
export class DeleteArtwork implements Usecase<string, void> {
    constructor(
        @inject(AppIdentifiers.artworkRepository)
        private readonly _artworkRepository: ArtworkRepository
    ) {}

    async execute(artworkId: string): Promise<void> {
        const artwork = await this._artworkRepository.getById(artworkId);
        if (!artwork) {
            return;
        }

        await this._artworkRepository.delete(artworkId);

        return;
    }
}
