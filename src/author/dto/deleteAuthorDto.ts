import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteAuthorDto {
  @ApiProperty()
  @IsMongoId()
  id: string;
}
