import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';
import { LocationDto } from './locationDto';
import { Type } from 'class-transformer';
import { CreateBookDto } from 'src/book/dto/createBookDto';

export class CreateStoreDto {
  @ApiProperty()
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookDto)
  books: CreateBookDto[];
}
