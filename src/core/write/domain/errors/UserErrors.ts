import { DomainError } from "./DomainError";

export namespace UserErrors {
    export class InvalidPasswordOrEmail extends DomainError {
        constructor(cause?: string) {
            super("Invalid password or email");
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
