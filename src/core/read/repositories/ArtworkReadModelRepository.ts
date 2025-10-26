import { ArtworkReadModel } from "../models/ArtworkReadModel";

export interface ArtworkReadModelRepository {
  getById(artworkId: string): Promise<ArtworkReadModel>;

  getAll(): Promise<ArtworkReadModel[]>;
}
