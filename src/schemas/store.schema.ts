import { HydratedDocument } from 'mongoose';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Book } from './book.schema';
import { Location } from './subschemas/location.schema';

export type BookDocument = HydratedDocument<Store>;

@Schema()
export class Store {
  @Prop({
    type: 'object',
  })
  location: Location;
  @Prop()
  books: Book[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
