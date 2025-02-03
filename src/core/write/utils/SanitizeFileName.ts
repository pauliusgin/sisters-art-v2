export const sanitizeFileName = (fileName: string) => {
    return fileName.replace(/[^a-z0-9_.-]/gi, "_").toLowerCase();
};
