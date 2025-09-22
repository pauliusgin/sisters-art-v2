import { Expose, plainToClass } from "class-transformer";
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
  @Length(1)
  title: string;

  @Expose()
  @IsEnum(Author)
  author: Author;

  @Expose()
  @IsOptional()
  @IsEnum(ArtworkType)
  type: ArtworkType;

  @Expose()
  @IsOptional()
  @IsEnum(ArtworkMethod)
  method: ArtworkMethod;

  @Expose()
  @IsOptional()
  @IsEnum(ArtworkMaterial)
  material: ArtworkMaterial;

  @Expose()
  @IsOptional()
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
