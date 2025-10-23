import { ApiProperty } from "@nestjs/swagger";
import { AuthTypeEnum } from "../enums/type.enums";
import { AuthMethodEnum } from "../enums/method.enum";
import { IsEnum, IsString, Length } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsString()
    @Length(3, 50)
    username : string ;
    @ApiProperty({enum : AuthTypeEnum})
    @IsEnum(AuthTypeEnum)
    type : AuthTypeEnum ;
    @ApiProperty({enum : AuthMethodEnum})
    @IsEnum(AuthMethodEnum)
    method : AuthMethodEnum ;
}