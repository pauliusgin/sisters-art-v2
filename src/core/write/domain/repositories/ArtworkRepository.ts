import { Artwork } from "../aggregates/Artwork";

export interface ArtworkRepository {
    save(artwork: Artwork): Promise<void>;

    getById(id: string): Promise<Artwork>;

    delete(artworkId: string): Promise<void>;
}
