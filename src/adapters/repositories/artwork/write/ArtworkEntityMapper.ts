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
      authorAge: t.props.authorAge,
      type: t.props.type,
      method: t.props.method,
      material: t.props.material,
      fileUrl: t.props.fileUrl,
      date: t.props.date,
    });
  }

  toDomain(raw: ArtworkEntity): Artwork {
    const artwork = Artwork.restore({
      id: raw.id,
      title: raw.title,
      author: raw.author,
      authorAge: raw.authorAge,
      type: raw.type,
      method: raw.method,
      material: raw.material,
      fileUrl: raw.fileUrl,
      date: raw.date,
    });

    artwork.createdAt = raw.createdAt;
    artwork.updatedAt = raw.updatedAt;

    return artwork;
  }
}
