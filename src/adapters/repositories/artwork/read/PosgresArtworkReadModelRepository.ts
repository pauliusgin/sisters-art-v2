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
    const result: ArtworkReadModel[] = await this._entityManager.query(
      `
    SELECT
      art.id,
      art.title,
      art.author,
      art."authorAge",
      art.type,
      art.method,
      art.material,
      art."fileUrl",
      art."date"
    FROM
      artworks art 
    ORDER BY 
      art.date DESC
    `
    );

    return result.map((artwork) =>
      this.artworkReadModelMapper.toDomain(artwork)
    );
  }

  async getById(artworkId: string): Promise<ArtworkReadModel> {
    const result: ArtworkReadModel[] = await this._entityManager.query(
      `
        SELECT
            art.id,
            art.title,
            art.author,
            art."authorAge"
            art.type,
            art.method,
            art.material,
            art."fileUrl",
            art."date"
        FROM
            artworks art 
        WHERE
            art.id = $1
  `,
      [artworkId]
    );
    return this.artworkReadModelMapper.toDomain(result[0]);
  }
}
