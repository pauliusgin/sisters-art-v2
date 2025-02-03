import { ArtworkReadModel } from "../models/ArtworkReadModel";

export interface ArtworkReadModelRepository {
    getById(id: string): Promise<ArtworkReadModel>;

    getAll(): Promise<ArtworkReadModel[]>;
}
