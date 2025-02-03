import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { ArtworkEntityMapper } from "./ArtworkEntityMapper";
import { ArtworkRepository } from "../../../../core/write/domain/repositories/ArtworkRepository";
import { Artwork } from "../../../../core/write/domain/aggregates/Artwork";
import { ArtworkEntity } from "./ArtworkEntity";

@injectable()
export class PostgresArtworkRepository implements ArtworkRepository {
    private artworkEntityMapper: ArtworkEntityMapper;

    constructor(private readonly entityManager: EntityManager) {
        this.artworkEntityMapper = new ArtworkEntityMapper(entityManager);
    }

    async save(artwork: Artwork): Promise<void> {
        const artworkRepository =
            this.entityManager.getRepository(ArtworkEntity);

        const artworkEntity = this.artworkEntityMapper.fromDomain(artwork);

        await artworkRepository.save(artworkEntity);

        return;
    }

    async getById(id: string): Promise<Artwork> {
        const artworkRepository =
            this.entityManager.getRepository(ArtworkEntity);

        const artwork = await artworkRepository.findOne({
            where: {
                id,
            },
        });

        return this.artworkEntityMapper.toDomain(artwork);
    }

    async delete(artworkId: string): Promise<void> {
        const artworkRepository = this.entityManager.getRepository(artworkId);

        const artwork = await artworkRepository.delete({
            id: artworkId,
        });

        if (artwork) {
            return;
        }

        return;
    }
}
