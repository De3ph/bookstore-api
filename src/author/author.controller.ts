import { Controller, Get, Post, Delete, Body } from '@nestjs/common';
import { CreateAuthorDto } from './dto/createAuthorDto';
import { AuthorService } from './author.service';
import { DeleteAuthorDto } from './dto/deleteAuthorDto';

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

  @Delete()
  delete(@Body() deleteAuthorDto: DeleteAuthorDto) {
    return this.authorService.delete(deleteAuthorDto);
  }
}
