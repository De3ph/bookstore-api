import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './createBookDto';

export class UpdateBookDto extends PartialType(CreateBookDto) {}
