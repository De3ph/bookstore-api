import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './../dto/book/createBookDto';
import { UpdateBookDto } from 'src/dto/book/updateBookDto';
import { Book } from 'src/schemas/book.schema';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getAll() {
    return await this.bookModel.find();
  }

  async create(createBookDto: CreateBookDto) {
    const book = new this.bookModel(createBookDto);
    return await book.save();
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    return await this.bookModel.updateOne(
      {
        _id: id,
      },
      updateBookDto,
    );
  }

  async delete(id: string) {
    return await this.bookModel.deleteOne({ _id: id });
  }
}
