import { IsEmail, IsString, Matches, MinLength } from "class-validator";
import { IsUnique } from "../users_data_decorator";

export class UsersDataSignUpDto {
    
    @IsEmail()
    @IsUnique("User", "email")
    email: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: "Password must contain at least one number" })
    password: string;
    
}
