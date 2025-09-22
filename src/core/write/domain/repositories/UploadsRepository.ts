import { Upload } from "../aggregates/Upload";

export interface UploadsRepository {
  save(upload: Upload): Promise<void>;

  getById(id: string): Promise<Upload>;

  findByToken(token: string): Promise<Upload>;

  findByEntityId(usageEntityId: string): Promise<Upload[]>;

  delete(id: string): Promise<void>;
}
