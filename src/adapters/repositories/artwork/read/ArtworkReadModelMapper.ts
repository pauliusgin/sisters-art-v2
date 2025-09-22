import { ArtworkReadModel } from "../../../../core/read/models/ArtworkReadModel";
import { Mapper } from "../../Mapper";

export class ArtworkReadModelMapper implements Mapper<any, ArtworkReadModel> {
  toDomain(raw: any): ArtworkReadModel {
    return {
      id: raw.id,
      title: raw.title,
      author: raw.author,
      type: raw.type,
      method: raw.method,
      material: raw.material,
      fileUrl: raw.fileUrl,
      date: raw.date,
    };
  }
}
