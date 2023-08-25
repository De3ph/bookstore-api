import { Controller, Get, Post, Body, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { FindUserDto } from './dto/findUserDto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  find(@Body() findUserDto: FindUserDto) {
    return this.userService.find(findUserDto.username);
  }

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    const isSaved = this.userService.create(createUserDto);
    return isSaved ? HttpStatus.CREATED : HttpStatus.SERVICE_UNAVAILABLE;
  }
}
