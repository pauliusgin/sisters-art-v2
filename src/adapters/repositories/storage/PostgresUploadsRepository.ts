import { injectable } from "inversify";
import { EntityManager } from "typeorm";
import { UploadEntity } from "./UploadEntity";
import { UploadEntityMapper } from "./UploadEntityMapper";
import { Upload, UploadsRepository } from "../../../core";
import { FileStatus } from "../../../messages";

@injectable()
export class PostgresUploadsRepository implements UploadsRepository {
  private readonly uploadEntityMapper: UploadEntityMapper;

  constructor(private readonly entityManager: EntityManager) {
    this.uploadEntityMapper = new UploadEntityMapper(entityManager);
  }

  async save(upload: Upload): Promise<void> {
    const uploadsRepository = this.entityManager.getRepository(UploadEntity);

    const uploadEntity = this.uploadEntityMapper.fromDomain(upload);

    await uploadsRepository.save(uploadEntity);
  }

  async getById(id: string): Promise<Upload> {
    const uploadsRepository = this.entityManager.getRepository(UploadEntity);

    const upload = await uploadsRepository.findOne({
      where: {
        id,
      },
    });

    if (!upload) {
      return null;
    }

    return this.uploadEntityMapper.toDomain(upload);
  }

  async findByToken(token: string): Promise<Upload> {
    const uploadsRepository = this.entityManager.getRepository(UploadEntity);

    const upload = await uploadsRepository.findOne({
      where: {
        token,
      },
    });

    if (!upload) {
      return null;
    }

    return this.uploadEntityMapper.toDomain(upload);
  }

  async findByEntityId(usageEntityId: string): Promise<Upload[]> {
    const uploadsRepository = this.entityManager.getRepository(UploadEntity);

    const uploads = await uploadsRepository.find({
      where: {
        usageEntityId,
      },
      order: {
        createdAt: "DESC",
      },
    });

    return uploads.map((upload) => this.uploadEntityMapper.toDomain(upload));
  }

  async findPending(): Promise<Upload[]> {
    const uploadsRepository = this.entityManager.getRepository(UploadEntity);

    const uploads = await uploadsRepository.find({
      where: {
        status: FileStatus.PENDING,
      },
    });

    return uploads.map((upload) => this.uploadEntityMapper.toDomain(upload));
  }

  async delete(id: string): Promise<void> {
    const uploadRepository = this.entityManager.getRepository(UploadEntity);

    await uploadRepository.delete({ id });
  }
}
