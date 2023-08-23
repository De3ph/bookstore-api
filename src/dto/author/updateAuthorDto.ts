import { PartialType } from '@nestjs/swagger';
import { CreateAuthorDto } from './createAuthorDto';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
