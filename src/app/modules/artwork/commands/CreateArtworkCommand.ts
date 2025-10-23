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

export class CreateArtworkCommand {
  @Expose()
  @IsString()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "") return null;
    return value;
  })
  title: string;

  @Expose()
  @IsEnum(Author)
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
  @Transform(({ value }) => {
    return value.split("T")[0] + "T12:00:00.000Z";
  })
  date: Date;

  @Expose()
  @IsString()
  @Length(1)
  @IsUrl()
  fileUrl: string;

  static setProperties(cmd: CreateArtworkCommand): CreateArtworkCommand {
    return plainToClass(CreateArtworkCommand, cmd, {
      excludeExtraneousValues: true,
    });
  }
}
