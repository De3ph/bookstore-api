import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';

export type AuthorDocument = HydratedDocument<Author>;

@Schema()
export class Author {
  @Prop()
  name: string;

  @Prop()
  country: string;

  @Prop({ type: mongoose.Schema.Types.Date })
  birthDate: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
