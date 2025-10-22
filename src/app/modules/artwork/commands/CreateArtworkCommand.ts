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
  })
  type: ArtworkType;

  @Expose()
  @IsEnum(ArtworkMethod)
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "") return null;
  })
  method: ArtworkMethod;

  @Expose()
  @IsEnum(ArtworkMaterial)
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "") return null;
  })
  material: ArtworkMaterial;

  @Expose()
  @IsISO8601()
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
