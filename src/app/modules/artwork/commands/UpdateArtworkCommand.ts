import { Expose, plainToClass } from "class-transformer";
import {
  IsDate,
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
  @IsOptional()
  @IsString()
  @Length(1)
  title: string;

  @Expose()
  @IsOptional()
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
  @IsString()
  @Length(1)
  @IsUrl()
  fileUrl: string;

  @Expose()
  @IsOptional()
  @IsISO8601()
  date: Date;

  static setProperties(cmd: UpdateArtworkCommand): UpdateArtworkCommand {
    return plainToClass(UpdateArtworkCommand, cmd, {
      excludeExtraneousValues: true,
    });
  }
}
