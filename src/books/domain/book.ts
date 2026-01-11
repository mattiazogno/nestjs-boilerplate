import { authors } from '../../authors/domain/authors';
import { ApiProperty } from '@nestjs/swagger';

export class book {
  @ApiProperty({
    type: () => authors,
    nullable: false,
  })
  authors: authors;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
