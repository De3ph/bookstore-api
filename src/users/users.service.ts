import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUserDto';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { GetUsersDto } from './dto/getUsersDto';
import { Book } from 'src/schemas/book.schema';
import { BookService } from 'src/book/book.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly bookService: BookService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<GetUsersDto> {
    const res = new GetUsersDto();
    const users = await this.userModel.find();

    users.forEach((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      res.users.push({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    });

    return res;
  }

  async find(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.bcryptService.hashPassword(
        createUserDto.password,
      );
      const user = new this.userModel(createUserDto);

      await user.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  async borrowBook(bookId: string, userId: string) {
    const book = await this.bookModel.findOne({ _id: bookId });

    // no book with bookId
    if (!book) {
      throw new NotFoundException();
    }

    if (book.isBorrowed) {
      throw new BadRequestException('The book is already borrowed.');
    }

    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    if (user.borrowedBooks.length >= 10) {
      throw new Error('A user can borrow maximum 10 books.');
    }

    await this.userModel.updateOne(
      { _id: userId },
      {
        $push: { borrowedBooks: bookId },
      },
    );

    await this.bookService.markBookAsBorrowed(bookId);

    return true;
  }

  async giveBookBack(bookId: string, userId: string) {
    const book = await this.bookModel.findOne({ _id: bookId });
    if (!book) {
      throw new NotFoundException('Book is not found.');
    }

    const user = await this.userModel.findOne({ _id: userId });

    if (!user) {
      throw new NotFoundException('User is not found.');
    }

    if (!user.borrowedBooks.includes(bookId)) {
      throw new NotFoundException('User have not borrowed this book.');
    }

    await user.updateOne({ $pull: { borrowedBooks: bookId } });

    await this.bookService.relaseBorrowedBook(bookId);
  }
}
