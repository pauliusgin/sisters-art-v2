import { inject, injectable } from "inversify";
import { Usecase } from "../../write/usecases/Usecase";
import { ArtworkReadModel } from "../models/ArtworkReadModel";
import { AppIdentifiers } from "../../AppIdentifiers";
import { ArtworkReadModelRepository } from "../repositories/ArtworkReadModelRepository";

@injectable()
export class GetAllArtworks implements Usecase<void, ArtworkReadModel[]> {
    constructor(
        @inject(AppIdentifiers.artworkReadModelRepository)
        private readonly _artworkRepository: ArtworkReadModelRepository
    ) {}

    async execute(): Promise<ArtworkReadModel[]> {
        return await this._artworkRepository.getAll();
    }
}
