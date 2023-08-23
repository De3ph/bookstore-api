import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  country: string;
  @ApiProperty({
    description: 'Date format should be YYYY-MM-DD',
  })
  @IsDateString()
  birthDate: Date;
}
