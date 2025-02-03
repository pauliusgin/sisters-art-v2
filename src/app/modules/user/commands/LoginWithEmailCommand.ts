import {Expose, plainToClass} from "class-transformer";
import {IsEmail, IsString} from "class-validator";

export class LoginWithEmailCommand {
    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    password : string;

    static setProperties(cmd: LoginWithEmailCommand):  LoginWithEmailCommand {
        return plainToClass(LoginWithEmailCommand, cmd, { excludeExtraneousValues: true });
    }
}