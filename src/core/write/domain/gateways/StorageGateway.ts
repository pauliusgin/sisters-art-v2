export interface StorageGateway {
    upload(payload: {
        fileBuffer: Buffer;
        fileName: string;
        mimeType: string;
    }): Promise<{ url: string }>;

    delete(fileUrl: string): Promise<void>;
}
