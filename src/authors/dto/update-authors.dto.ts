// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateauthorsDto } from './create-authors.dto';

export class UpdateauthorsDto extends PartialType(CreateauthorsDto) {}
