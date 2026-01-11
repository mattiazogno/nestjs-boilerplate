import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class authorsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
