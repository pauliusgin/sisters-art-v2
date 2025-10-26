import { v4 } from "uuid";
import {
  ArtworkMaterial,
  ArtworkMethod,
  ArtworkType,
  Author,
} from "../../../../messages";
import { calculateAge } from "../../utils/calculateAge";

export interface ArtworkProperties {
  id: string;
  title?: string;
  author: Author;
  authorAge: number[];
  type?: ArtworkType;
  method?: ArtworkMethod;
  material?: ArtworkMaterial;
  fileUrl: string;
  date?: Date;
  deletedAt?: Date;
}

export class Artwork {
  static viltauteBirthday = "2020-10-14";
  static jogaileBirthday = "2022-06-10";

  createdAt = new Date();
  updatedAt = new Date();
  props: ArtworkProperties;

  constructor(props: ArtworkProperties) {
    this.props = props;
  }

  static restore(props: ArtworkProperties) {
    return new Artwork(props);
  }
  static create(payload: {
    title?: string;
    author: Author;
    type?: ArtworkType;
    method?: ArtworkMethod;
    material?: ArtworkMaterial;
    fileUrl: string;
    date?: Date;
  }) {
    const { title, author, type, method, material, fileUrl, date } = payload;

    const artwork = new Artwork({
      id: v4(),
      title,
      author,
      type,
      method,
      material,
      fileUrl,
      date,
      authorAge: calculateAge({
        author,
        artCreatedAt: date,
      }),
    });

    return artwork;
  }

  update(payload: {
    title?: string;
    author?: Author;
    type?: ArtworkType;
    method?: ArtworkMethod;
    material?: ArtworkMaterial;
    date?: Date;
  }) {
    const { title, author, type, method, material, date } = payload;

    this.props.title = title;
    this.props.author = author;
    this.props.type = type;
    this.props.method = method;
    this.props.material = material;
    this.props.date = date;
    this.props.authorAge = calculateAge({
      author,
      artCreatedAt: date,
    });
  }

  delete() {
    this.props.deletedAt = new Date();
  }
}
