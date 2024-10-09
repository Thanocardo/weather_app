import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { IfExists } from "../users_data_decorator";

export class UsersDataLoginDto {

    @IsEmail() 
    @IfExists("User", "email")
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: "Password must contain at least one number" })
    password: string;
    
}
