import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateAuthorDto } from 'src/dto/author/createAuthorDto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAll() {
    return this.authorService.getAll();
  }

  @Post()
  createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }
}
