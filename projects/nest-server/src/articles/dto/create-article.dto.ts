import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
    title: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(100)
  @ApiProperty({ required: false })
    description?: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
    body: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
    published?: boolean = false

}
