import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FindUserDto {
  @ApiProperty()
  @IsString()
  username: string;
}
