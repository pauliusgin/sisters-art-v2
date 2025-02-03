import { DomainError } from "./DomainError";

export namespace UserErrors {
    export class InvalidPasswordOrEmail extends DomainError {
        constructor(cause?: string) {
            super("INVALID_PASSWORD_OR_EMAIL");
            this.cause = cause;
        }
    }

    export class UserNotFound extends DomainError {
        constructor(cause?: string) {
            super("USER_NOT_FOUND");
            this.cause = cause;
        }
    }
}
