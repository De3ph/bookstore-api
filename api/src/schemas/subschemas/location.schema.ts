import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop()
  country: string;
  @Prop()
  city: string;
  @Prop()
  postCode: number;
}

export const LocationSchema = SchemaFactory.createForClass(Location);
