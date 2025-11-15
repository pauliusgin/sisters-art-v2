import { Expose, plainToClass, Transform } from "class-transformer";

export class ArtQueryParams {
  @Expose()
  @Transform(({ value }) => {
    if (value === "") return null;
    return value;
  })
  search: string;

  static setProperties(cmd: ArtQueryParams): ArtQueryParams {
    return plainToClass(ArtQueryParams, cmd, {
      excludeExtraneousValues: true,
    });
  }
}
