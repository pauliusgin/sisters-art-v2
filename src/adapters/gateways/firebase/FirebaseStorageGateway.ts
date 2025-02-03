import { Storage } from "firebase-admin/storage";
import { injectable } from "inversify";
import { StorageGateway } from "../../../core/write/domain/gateways/StorageGateway";

@injectable()
export class FirebaseStorageGateway implements StorageGateway {
    constructor(private readonly firebaseStorage: Storage) {}

    async upload(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string
    ): Promise<{ url: string }> {
        const storage = this.firebaseStorage.bucket("firebase-storage-url");
        const filePath = `artwork/${Date.now()}_${fileName}`;
        const file = storage.file(filePath);

        await file.save(fileBuffer, {
            metadata: { contentType: mimeType },
        });

        await file.makePublic();

        const url = file.publicUrl();

        return { url };
    }
}
