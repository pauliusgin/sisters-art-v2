import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { UploadsRepository } from "../../domain/repositories/UploadsRepository";
import { StorageGateway } from "../../domain/gateways/StorageGateway";
import { Upload } from "../../domain/aggregates/Upload";

export interface DeleteUnusedUploadsInput {
  usageEntityId: string;
}

@injectable()
export class DeleteUnusedUploads
  implements Usecase<DeleteUnusedUploadsInput, void>
{
  constructor(
    @inject(AppIdentifiers.uploadsRepository)
    private readonly _uploadsRepository: UploadsRepository,
    @inject(AppIdentifiers.storageGateway)
    private readonly _uploadsGateway: StorageGateway
  ) {}

  async execute(request: DeleteUnusedUploadsInput): Promise<void> {
    const { usageEntityId } = request;

    const uploads = await this._uploadsRepository.findByEntityId(usageEntityId);

    const uploadsLimit = Upload.limitForEntity;

    if (uploads.length <= uploadsLimit) {
      return;
    }

    const unusedPreviousUploads = uploads.slice(uploadsLimit);

    for (const previousUpload of unusedPreviousUploads) {
      const { id, path } = previousUpload.props;

      await this._uploadsGateway.delete(path);
      await this._uploadsRepository.delete(id);
    }
  }
}
