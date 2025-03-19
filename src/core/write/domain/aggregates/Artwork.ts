import { v4 } from "uuid";
import { ArtworkType } from "../../../../messages/types/ArtworkType";
import { ArtworkMethod } from "../../../../messages/types/ArtworkMethod";
import { ArtworkMaterial } from "../../../../messages/types/ArtworkMaterial";
import { Author } from "../../../../messages/types/Author";
import { calculateAge } from "../../utils/calculateAge";

export interface ArtworkProperties {
    id: string;
    title?: string;
    author: Author;
    authorAge: number;
    type?: ArtworkType;
    method?: ArtworkMethod;
    material?: ArtworkMaterial;
    image: string;
    date?: Date;
}

export class Artwork {
    static viltauteBirthday = "2020-10-16";
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
        image: string;
        date?: Date;
    }) {
        const { title, author, type, method, material, image, date } = payload;

        console.log("date ------>", date);

        const artwork = new Artwork({
            id: v4(),
            title,
            author,
            type,
            method,
            material,
            image,
            date,
            authorAge:
                author === Author.JOGAILE
                    ? calculateAge(date, Artwork.jogaileBirthday)
                    : calculateAge(date, Artwork.viltauteBirthday),
        });

        return artwork;
    }

    update(payload: {
        title?: string;
        author?: Author;
        type?: ArtworkType;
        method?: ArtworkMethod;
        material?: ArtworkMaterial;
        date: Date;
    }) {
        const { title, author, type, method, material, date } = payload;

        this.props.title = title;
        this.props.author = author;
        this.props.type = type;
        this.props.method = method;
        this.props.material = material;
        this.props.date = date;
    }
}
