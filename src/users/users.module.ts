import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { UsersController } from './users.controller';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { Book, BookSchema } from 'src/schemas/book.schema';
import { BookService } from 'src/book/book.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  providers: [UsersService, BcryptService, BookService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
