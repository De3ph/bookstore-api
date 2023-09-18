import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import mongoose from 'mongoose';
import { Author } from 'src/schemas/author.schema';

export class CreateBookDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty({
    type: mongoose.Schema.Types.ObjectId,
    description: 'ObjectId value of author',
  })
  @IsString()
  author: Author;
  @ApiProperty()
  @IsNumber()
  price: number;
  @ApiProperty()
  @IsString()
  ISBN: string;
  @ApiProperty()
  @IsString()
  language: string;
  @ApiProperty()
  @IsNumber()
  numberOfPages: number;
  @ApiProperty()
  @IsString()
  publisher: string;
}
