import { differenceInYears } from "date-fns";
export function calculateAge(payload: {
  artCreatedAt: string | Date;
  birthDate: string | Date;
}): number {
  const { artCreatedAt, birthDate } = payload;

  const birthday = new Date(birthDate);
  const artCreatedOn = new Date(artCreatedAt);

  const age = differenceInYears(artCreatedOn, birthday);

  return age;
}
