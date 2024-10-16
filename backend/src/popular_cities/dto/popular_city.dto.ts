import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

class CountryDto {
    @IsString()
    @IsNotEmpty()
    ID: string;
  
    @IsString()
    @IsNotEmpty()
    LocalizedName: string;
  }
  
  class AdministrativeAreaDto {
    @IsString()
    @IsNotEmpty()
    ID: string;
  
    @IsString()
    @IsNotEmpty()
    LocalizedName: string;
  }
  
  export class PopularCityDto {
    @IsNumber()
    @IsNotEmpty()
    Version: number;

    @IsString()
    @IsNotEmpty()
    Key: string;
  
    @IsString()
    @IsNotEmpty()
    Type: string;
  
    @IsNumber()
    @IsNotEmpty()
    Rank: number;
  
    @IsString()
    @IsNotEmpty()
    LocalizedName: string;
  
    @ValidateNested()
    @IsObject()
    @Type(() => CountryDto)
    Country: CountryDto;
  
    @ValidateNested()
    @IsObject()
    @Type(() => AdministrativeAreaDto)
    AdministrativeArea: AdministrativeAreaDto;
  }

