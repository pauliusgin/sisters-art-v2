import { Storage } from "firebase-admin/storage";
import { injectable } from "inversify";
import { StorageGateway } from "../../../core/write/domain/gateways/StorageGateway";

@injectable()
export class FirebaseStorageGateway implements StorageGateway {
    constructor(private readonly firebaseStorage: Storage) {}

    async upload(payload: {
        fileBuffer: Buffer;
        fileName: string;
        mimeType: string;
    }): Promise<{ url: string }> {
        const { fileBuffer, fileName, mimeType } = payload;

        const bucket = this.firebaseStorage.bucket();
        const fileUrl = `artwork/${Date.now()}_${fileName}`;
        const file = bucket.file(fileUrl);

        await file.save(fileBuffer, {
            metadata: { contentType: mimeType },
        });

        await file.makePublic();

        const url = file.publicUrl();

        return { url };
    }

    async delete(fileUrl: string): Promise<void> {
        const bucket = this.firebaseStorage.bucket();
        const file = bucket.file(fileUrl);

        try {
            await file.delete();
        } catch (error: any) {
            console.log("error while deleting a file ------>", error);
        }
    }
}
