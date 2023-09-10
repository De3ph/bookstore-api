import { PartialType } from '@nestjs/swagger';
import { BorrowBookDto } from './borrowBookDto';

export class ReleaseBookDto extends PartialType(BorrowBookDto) {}
