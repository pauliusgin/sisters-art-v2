import { Expose, plainToClass } from "class-transformer";
import {
    IsDate,
    IsEnum,
    IsOptional,
    IsString,
    MaxLength,
} from "class-validator";
import { Author } from "../../../../messages/types/Author";
import { ArtworkType } from "../../../../messages/types/ArtworkType";
import { ArtworkMethod } from "../../../../messages/types/ArtworkMethod";
import { ArtworkMaterial } from "../../../../messages/types/ArtworkMaterial";

export class CreateArtworkCommand {
    @Expose()
    @IsString()
    @MaxLength(50)
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
    @IsString()
    @MaxLength(500)
    image: string;

    @Expose()
    @IsDate()
    @IsOptional()
    date: Date;

    static setProperties(cmd: CreateArtworkCommand): CreateArtworkCommand {
        return plainToClass(CreateArtworkCommand, cmd, {
            excludeExtraneousValues: true,
        });
    }
}
