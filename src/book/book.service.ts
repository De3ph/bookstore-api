import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/createBookDto';
import { UpdateBookDto } from 'src/book/dto/updateBookDto';
import { Book } from '../schemas/book.schema';
import { Model } from 'mongoose';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getAll(): Promise<any[]> {
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

  async markBookAsBorrowed(id: string) {
    const book = await this.bookModel.exists({ _id: id });
    if (!book) {
      return null;
    }

    return await this.bookModel.updateOne(
      { _id: id },
      {
        $set: { isBorrowed: true },
      },
    );
  }

  async relaseBorrowedBook(id: string) {
    const book = await this.bookModel.exists({ _id: id });
    if (!book) {
      return null;
    }

    return await this.bookModel.updateOne(
      { _id: id },
      {
        $set: { isBorrowed: false },
      },
    );
  }
}
