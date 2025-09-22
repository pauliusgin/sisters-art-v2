import { inject, injectable } from "inversify";
import { AppIdentifiers } from "../../../AppIdentifiers";
import { UploadsRepository } from "../../domain/repositories/UploadsRepository";
import { StorageGateway } from "../../domain/gateways/StorageGateway";
import { Usecase } from "../Usecase";

export interface DeleteUploadedFileInput {
  token: string;
}

@injectable()
export class DeleteUploadedFile
  implements Usecase<DeleteUploadedFileInput, void>
{
  constructor(
    @inject(AppIdentifiers.uploadsRepository)
    private readonly _uploadsRepository: UploadsRepository,
    @inject(AppIdentifiers.storageGateway)
    private readonly _storageGateway: StorageGateway
  ) {}

  async execute(request: DeleteUploadedFileInput): Promise<void> {
    const upload = await this._uploadsRepository.findByToken(request.token);
    if (!upload) {
      return;
    }
    const { id, path } = upload.props;

    await this._storageGateway.delete(path);
    await this._uploadsRepository.delete(id);
  }
}
