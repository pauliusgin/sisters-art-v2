import { v4 } from "uuid";

export type UserProperties = {
    id: string;
    email?: string;
    phone?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    signInAt: Date;
    recoveryCode?: string;
};

export class User {
    createdAt = new Date();
    updatedAt = new Date();
    props: UserProperties;

    constructor(props: UserProperties) {
        this.props = props;
    }

    static restore(props: UserProperties): User {
        return new User(props);
    }

    static signUp(payload: { email: string; password?: string }) {
        const { email, password } = payload;

        return new User({
            id: v4(),
            email,
            password,
            signInAt: new Date(),
        });
    }

    loginWithEmail() {
        this.props.signInAt = new Date();
    }

    loginWithPhone() {
        this.props.signInAt = new Date();
    }

    generateRecoveryCode() {
        this.props.recoveryCode = v4();
    }

    resetPassword(newPassword: string) {
        this.props.password = newPassword;
    }
}
