import { EntityManager } from "typeorm";
import { UploadEntity } from "./UploadEntity";
import { Upload } from "../../../core";
import { Mapper } from "../Mapper";

export class UploadEntityMapper implements Mapper<UploadEntity, Upload> {
  constructor(private readonly entityManager: EntityManager) {}

  fromDomain(t: Upload): UploadEntity {
    return this.entityManager.create(UploadEntity, {
      id: t.props.id,
      userId: t.props.userId,
      fileType: t.props.fileType,
      url: t.props.url,
      token: t.props.token,
      path: t.props.path,
      usageEntityId: t.props.usageEntityId,
      usage: t.props.usage,
      status: t.props.status,
    });
  }

  toDomain(raw: UploadEntity): Upload {
    const upload = Upload.restore({
      id: raw.id,
      userId: raw.userId,
      fileType: raw.fileType,
      url: raw.url,
      token: raw.token,
      path: raw.path,
      usageEntityId: raw.usageEntityId,
      usage: raw.usage,
      status: raw.status,
    });

    upload.createdAt = raw.createdAt;
    upload.updatedAt = raw.updatedAt;

    return upload;
  }
}
