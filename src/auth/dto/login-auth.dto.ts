// import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginAuthDto {
    // @ApiProperty()
    @IsNotEmpty()
    username: string;

    // @ApiProperty()
    @IsNotEmpty()
    password: string;

    // @ApiProperty({enum: ['admin','supplier','agent']})
    // @IsNotEmpty()
    // user_type: string;
}