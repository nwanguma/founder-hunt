import { Controller, Post, Get, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('')
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.addUser(body);
  }

  @Get('')
  getUsers() {
    return this.usersService.findUsers();
  }
}
