import { DomainError } from "./DomainError";

export namespace UploadErrors {
  export class FileNotFound extends DomainError {
    constructor(cause?: string) {
      super("FILE_NOT_FOUND");
      this.cause = cause;
    }
  }

  export class InvalidFileFormat extends DomainError {
    constructor(cause?: string) {
      super("Invalid file format");
      this.cause = cause;
    }
  }

  export class UnableToUpload extends DomainError {
    constructor(cause?: string) {
      super("Unable to upload");
      this.cause = cause;
    }
  }

  export class UploadTokenNotFound extends DomainError {
    constructor(cause?: string) {
      super("UPLOAD_TOKEN_NOT_FOUND");
      this.cause = cause;
    }
  }
}
