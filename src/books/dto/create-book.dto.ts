import { authorsDto } from '../../authors/dto/authors.dto';

import {
  // decorators here

  IsString,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import {
  // decorators here
  Type,
} from 'class-transformer';

export class CreatebookDto {
  @ApiProperty({
    required: true,
    type: () => authorsDto,
  })
  @ValidateNested()
  @Type(() => authorsDto)
  @IsNotEmptyObject()
  authors: authorsDto;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  title: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
