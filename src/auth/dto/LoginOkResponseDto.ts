import { ApiProperty } from '@nestjs/swagger';

export class LoginOKResponseDto {
  @ApiProperty()
  access_token: string;
}
