import { Expose, plainToClass, Transform } from "class-transformer";
import {
  IsEnum,
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from "class-validator";
import {
  ArtworkMaterial,
  ArtworkMethod,
  ArtworkType,
  Author,
} from "../../../../messages";

export class UpdateArtworkCommand {
  @Expose()
  @IsString()
  @Length(1)
  @IsOptional()
  title: string;

  @Expose()
  @IsEnum(Author)
  @IsOptional()
  author: Author;

  @Expose()
  @IsEnum(ArtworkType)
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "") return null;
    return value;
  })
  type: ArtworkType;

  @Expose()
  @IsEnum(ArtworkMethod)
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "") return null;
    return value;
  })
  method: ArtworkMethod;

  @Expose()
  @IsEnum(ArtworkMaterial)
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "") return null;
    return value;
  })
  material: ArtworkMaterial;

  @Expose()
  @IsISO8601()
  @IsOptional()
  date: Date;

  static setProperties(cmd: UpdateArtworkCommand): UpdateArtworkCommand {
    return plainToClass(UpdateArtworkCommand, cmd, {
      excludeExtraneousValues: true,
    });
  }
}
