import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { ArtworkReadModelRepository } from "../../../../core/read/repositories/ArtworkReadModelRepository";
import { ArtworkReadModel } from "../../../../core/read/models/ArtworkReadModel";
import { ArtworkReadModelMapper } from "./ArtworkReadModelMapper";

@injectable()
export class PostgresArtworkReadModelRepository
    implements ArtworkReadModelRepository
{
    private artworkReadModelMapper: ArtworkReadModelMapper;

    constructor(private readonly _entityManager: EntityManager) {
        this.artworkReadModelMapper = new ArtworkReadModelMapper();
    }

    async getAll(): Promise<ArtworkReadModel[]> {
        const result = await this._entityManager.query(
            `
    SELECT
  `
        );
        return result.map((artwork) =>
            this.artworkReadModelMapper.toDomain(artwork)
        );
    }

    async getById(artworkId: string): Promise<ArtworkReadModel> {
        const result = await this._entityManager.query(
            `
    SELECT
  `,
            [artworkId]
        );
        return this.artworkReadModelMapper.toDomain(result[0]);
    }
}
