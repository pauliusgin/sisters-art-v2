import { inject, injectable } from "inversify";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { Usecase } from "../Usecase";
import { UploadsRepository } from "../../domain/repositories/UploadsRepository";
import { StorageGateway } from "../../domain/gateways/StorageGateway";

@injectable()
export class DeletePendingUploads implements Usecase<void, void> {
  constructor(
    @inject(AppIdentifiers.uploadsRepository)
    private readonly _uploadsRepository: UploadsRepository,
    @inject(AppIdentifiers.storageGateway)
    private readonly _uploadsGateway: StorageGateway
  ) {}

  async execute(): Promise<void> {
    const pendingUploads = await this._uploadsRepository.findPending();

    if (!pendingUploads.length) {
      return;
    }

    for (const upload of pendingUploads) {
      const { id, path } = upload.props;

      await this._uploadsGateway.delete(path);
      await this._uploadsRepository.delete(id);
    }
  }
}
