import { Expose, plainToClass } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class SignUpCommand {
    @Expose()
    @IsEmail()
    email: string;

    @Expose()
    @IsString()
    password: string;

    static setProperties(cmd: SignUpCommand): SignUpCommand {
        return plainToClass(SignUpCommand, cmd, {
            excludeExtraneousValues: true,
        });
    }
}
