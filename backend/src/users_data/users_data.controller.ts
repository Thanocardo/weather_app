import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersDataService } from './users_data.service';
import { UsersDataLoginDto } from './dto/users_datum_login.dto';
import { UsersDataSignUpDto } from './dto/users_datum_signup.dto';

@Controller('auth')
export class UsersDataController {
  constructor(private readonly usersDataService: UsersDataService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  create(@Body() createUsersSignUpDto: UsersDataSignUpDto) {
    return this.usersDataService.signUp(createUsersSignUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(ValidationPipe)
  login(@Body() usersDataLoginDto: UsersDataLoginDto) {
    return this.usersDataService.login(usersDataLoginDto)
  }
}
