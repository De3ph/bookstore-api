import { IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsNumber()
  postCode: number;
}
