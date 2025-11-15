import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import {
  ArtworkReadModel,
  ArtworkReadModelRepository,
  GetArtworksParams,
} from "../../../../core";
import { ArtworkReadModelMapper } from "./ArtworkReadModelMapper";

@injectable()
export class PostgresArtworkReadModelRepository
  implements ArtworkReadModelRepository
{
  private artworkReadModelMapper: ArtworkReadModelMapper;

  constructor(private readonly _entityManager: EntityManager) {
    this.artworkReadModelMapper = new ArtworkReadModelMapper();
  }

  async getAll(params?: GetArtworksParams): Promise<ArtworkReadModel[]> {
    const values: string[] = [];
    let searchCondition = ``;

    if (params?.search) {
      values.push(`%${params.search}%`);
      const valueIndex = `$${values.length}`;

      searchCondition = `
        AND (
          art.title ILIKE ${valueIndex} OR
          art.author::text ILIKE ${valueIndex} OR
          art."authorAge"::text ILIKE ${valueIndex} OR
          art.type::text ILIKE ${valueIndex} OR
          art.method::text ILIKE ${valueIndex} OR
          art.material::text ILIKE ${valueIndex} OR
          art.date::text ILIKE ${valueIndex}
            )`;
    }

    const query = `SELECT
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
    WHERE
      art."deletedAt" IS NULL
      ${searchCondition}
    ORDER BY 
      art.date DESC
    `;

    const result: ArtworkReadModel[] = await this._entityManager.query(
      query,
      values
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
            art."authorAge",
            art.type,
            art.method,
            art.material,
            art."fileUrl",
            art."date"
        FROM
            artworks art 
        WHERE
            art.id = $1
            AND art."deletedAt" IS NULL
  `,
      [artworkId]
    );

    if (!result.length) {
      return null;
    }

    return this.artworkReadModelMapper.toDomain(result[0]);
  }
}
