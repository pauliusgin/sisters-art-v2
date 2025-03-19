import { differenceInYears } from "date-fns";
export function calculateAge(
    artworkDate: string | Date,
    birthDate: string | Date
): number {
    const birthday = new Date(birthDate);
    const artCreatedOn = new Date(artworkDate);

    const age = differenceInYears(artCreatedOn, birthday);

    return age;
}
