import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersDataService } from './users_data.service';
import { UsersDatumDto } from './dto/users_datum.dto';

@Controller('auth')
export class UsersDataController {
  constructor(private readonly usersDataService: UsersDataService) {}

  @Post('signup')
  create(@Body() createUsersDatumDto: UsersDatumDto) {
    return this.usersDataService.signUp(createUsersDatumDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: UsersDatumDto) {
    return this.usersDataService.login(credentials)
  }
}
