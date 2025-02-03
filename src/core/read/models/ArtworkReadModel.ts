import { ArtworkMaterial } from "../../../messages/types/ArtworkMaterial";
import { ArtworkMethod } from "../../../messages/types/ArtworkMethod";
import { ArtworkType } from "../../../messages/types/ArtworkType";

export interface ArtworkReadModel {
    id: string;
    title: string;
    author: string;
    type: ArtworkType;
    method: ArtworkMethod;
    material: ArtworkMaterial;
    image: string;
    date: Date;
}
