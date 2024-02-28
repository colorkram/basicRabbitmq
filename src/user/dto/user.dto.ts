import { IsNotEmpty, Matches } from "class-validator";
import { StatusEnum } from "src/utils/constatics/status.enum";

export class CreateUserDto {
    @IsNotEmpty()
    username: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Minimum six characters, at least one letter and one number.'
    })
    password: string;

    fullname: string;
}

export class UpdateUserDto {
    fullname: string;
    
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
        message: 'Minimum six characters, at least one letter and one number.'
    })
    password: string;

    @IsNotEmpty()
    status: string;
}
