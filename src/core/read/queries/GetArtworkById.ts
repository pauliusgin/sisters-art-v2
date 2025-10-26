import { inject, injectable } from "inversify";
import { Usecase } from "../../write/usecases/Usecase";
import { ArtworkReadModel } from "../models/ArtworkReadModel";
import { AppIdentifiers } from "../../AppIdentifiers";
import { ArtworkReadModelRepository } from "../repositories/ArtworkReadModelRepository";
import { ArtworkErrors } from "../../write/domain/errors/ArtworkErrors";

@injectable()
export class GetArtworkById implements Usecase<string, ArtworkReadModel> {
  constructor(
    @inject(AppIdentifiers.artworkReadModelRepository)
    private readonly _artworkRepository: ArtworkReadModelRepository
  ) {}

  async execute(artworkId: string): Promise<ArtworkReadModel> {
    const artwork = await this._artworkRepository.getById(artworkId);
    if (!artwork) {
      throw new ArtworkErrors.ArtworkNotFound(`artwork ID: ${artworkId}`);
    }

    return artwork;
  }
}
