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
      super("INVALID_FILE_FORMAT");
      this.cause = cause;
    }
  }

  export class UnableToUpload extends DomainError {
    constructor(cause?: string) {
      super("UNABLE_TO_UPLOAD");
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
