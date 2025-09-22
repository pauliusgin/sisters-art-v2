import { Storage } from "firebase-admin/storage";
import { injectable } from "inversify";
import { StorageGateway } from "../../../core";
import { v4 } from "uuid";
import { GatewayFileInput, GatewayFileOutput } from "../../../messages";

export interface FirebaseConfig {
  firebaseStorage: Storage;
  defaultBucket: string;
  baseUrl: string;
}

@injectable()
export class FirebaseStorageGateway implements StorageGateway {
  _firebase: Storage;
  constructor(private readonly config: FirebaseConfig) {
    this._firebase = config.firebaseStorage;
  }

  async upload(input: GatewayFileInput): Promise<GatewayFileOutput> {
    const { buffer, path, contentType } = input;

    const bucket = this._firebase.bucket(this.config.defaultBucket);
    const file = bucket.file(path);

    const token = v4();

    await file.save(buffer, {
      metadata: {
        contentType,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    const url = this.buildUrl({ bucketName: bucket.name, path, token });

    return {
      url,
      token,
    };
  }

  async delete(path: string): Promise<void> {
    const bucket = this._firebase.bucket(this.config.defaultBucket);
    const file = bucket.file(path);

    await file.delete();
  }

  buildUrl(payload: {
    bucketName: string;
    path: string;
    token: string;
  }): string {
    const { bucketName, path, token } = payload;

    const encodedPath = encodeURIComponent(path);

    return `${this.config.baseUrl}/b/${bucketName}/o/${encodedPath}?alt=media&token=${token}`;
  }
}
