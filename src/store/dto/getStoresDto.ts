import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { Book } from 'src/schemas/book.schema';

type Store = {
  _id: mongoose.Types.ObjectId;
  branchCode: string;
  location: object;
  books: Book[];
};

export class GetStoresDto {
  @ApiProperty()
  stores: Store[] = [];
}
