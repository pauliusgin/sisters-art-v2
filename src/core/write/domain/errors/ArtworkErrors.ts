import { DomainError } from "./DomainError";

export namespace ArtworkErrors {
    export class ArtworkNotFound extends DomainError {
        constructor(cause?: string) {
            super("ARTWORK_NOT_FOUND");
            this.cause = cause;
        }
    }
}
