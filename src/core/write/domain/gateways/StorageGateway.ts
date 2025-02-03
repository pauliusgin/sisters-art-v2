export interface StorageGateway {
    upload(
        fileBuffer: Buffer,
        fileName: string,
        mimeType: string
    ): Promise<{ url: string }>;
}
