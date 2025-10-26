import { Expose, plainToClass } from "class-transformer";
import { IsUUID } from "class-validator";

export class ArtworkIdCommand {
  @Expose()
  @IsUUID()
  artworkId: string;

  static setProperties(cmd: ArtworkIdCommand): ArtworkIdCommand {
    return plainToClass(ArtworkIdCommand, cmd, {
      excludeExtraneousValues: true,
    });
  }
}
