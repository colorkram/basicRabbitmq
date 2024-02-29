// import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
// import { UserType } from "src/enums/constants-enum";

export class SignUpUserDto {


    // @ApiProperty()
    fullname: string;

    // @ApiProperty()
    // lastname: string;

    // @IsNotEmpty()
    // // @ApiProperty()
    // email: string;

    // @ApiProperty()
    username: string;

    @IsNotEmpty()
    // @ApiProperty()
    password: string;

    // @ApiProperty()
    password_confirm: string;

    // @ApiProperty()
    phone: string;
    
    user_type: string;

    // @IsNotEmpty()
    // @ApiProperty({ enum: UserType, required: true })
    // user_type: string | UserType;
}