import { EntityManager } from "typeorm";
import { ArtworkEntity } from "./ArtworkEntity";
import { Mapper } from "../../Mapper";
import { Artwork } from "../../../../core/write/domain/aggregates/Artwork";

export class ArtworkEntityMapper implements Mapper<ArtworkEntity, Artwork> {
    constructor(private readonly entityManager: EntityManager) {}

    fromDomain(t: Artwork): ArtworkEntity {
        return this.entityManager.create(ArtworkEntity, {
            id: t.props.id,
            title: t.props.title,
            author: t.props.author,
            type: t.props.type,
            method: t.props.method,
            material: t.props.material,
            image: t.props.image,
            date: t.props.date,
        });
    }

    toDomain(raw: ArtworkEntity): Artwork {
        const artwork = Artwork.restore({
            id: raw.id,
            title: raw.title,
            author: raw.author,
            type: raw.type,
            method: raw.method,
            material: raw.material,
            image: raw.image,
            date: raw.date,
        });

        artwork.createdAt = raw.createdAt;
        artwork.updatedAt = raw.updatedAt;

        return artwork;
    }
}
