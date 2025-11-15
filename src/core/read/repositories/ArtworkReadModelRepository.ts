import { ArtworkReadModel } from "../models/ArtworkReadModel";
import { GetArtworksParams } from "../queries/GetAllArtworks";

export interface ArtworkReadModelRepository {
  getById(artworkId: string): Promise<ArtworkReadModel>;

  getAll(params: GetArtworksParams): Promise<ArtworkReadModel[]>;
}
