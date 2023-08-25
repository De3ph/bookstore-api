import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

type User = {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
};

export class GetUsersDto {
  @ApiProperty()
  users: User[] = [];
}
