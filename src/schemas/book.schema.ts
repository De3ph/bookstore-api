import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Author } from './author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema()
export class Book {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop()
  price: number;

  @Prop({
    unique: true,
  })
  ISBN: string;

  @Prop()
  language: string;

  @Prop()
  numberOfPages: number;

  @Prop()
  publisher: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
