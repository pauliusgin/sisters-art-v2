import { differenceInYears } from "date-fns";
import { Author } from "../../../messages";
import { Artwork } from "../domain/aggregates/Artwork";
export function calculateAge(payload: {
  author: Author;
  artCreatedAt: string | Date;
}): number[] {
  const { author, artCreatedAt } = payload;

  const artCreatedOn = new Date(artCreatedAt);

  switch (author) {
    case Author.VILTAUTE: {
      const birthday = new Date(Artwork.viltauteBirthday);
      const age = differenceInYears(artCreatedOn, birthday);

      return [age];
    }
    case Author.JOGAILE: {
      const birthday = new Date(Artwork.jogaileBirthday);
      const age = differenceInYears(artCreatedOn, birthday);

      return [age];
    }
    case Author.BOTH: {
      const viltauteBirthday = new Date(Artwork.viltauteBirthday);
      const viltauteAge = differenceInYears(artCreatedOn, viltauteBirthday);
      const jogaileBirthday = new Date(Artwork.jogaileBirthday);
      const jogaileAge = differenceInYears(artCreatedOn, jogaileBirthday);

      return [viltauteAge, jogaileAge];
    }
  }
}
