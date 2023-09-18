import { IsNotEmpty, IsString } from 'class-validator';

export class BorrowBookDto {
  @IsNotEmpty()
  @IsString()
  bookId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
