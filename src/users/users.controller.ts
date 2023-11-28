import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUserDto';
import { FindUserDto } from './dto/findUserDto';
import { BorrowBookDto } from './dto/borrowBookDto';
import { ReleaseBookDto } from './dto/releaseBookDto';
import { SignedInGuard } from 'src/auth/guards/signed-in.guard';

@Controller('users')
@UseGuards(SignedInGuard)
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

  @Post('/borrowBook')
  borrow(@Body() borrowBookDto: BorrowBookDto) {
    const res = this.userService.borrowBook(
      borrowBookDto.bookId,
      borrowBookDto.userId,
    );
    return res;
  }

  @Post('/releaseBook')
  giveBack(@Body() releaseBookDto: ReleaseBookDto) {
    const res = this.userService.giveBookBack(
      releaseBookDto.bookId,
      releaseBookDto.userId,
    );
    return res;
  }
}
