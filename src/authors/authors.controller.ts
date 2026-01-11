import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { authorsService } from './authors.service';
import { CreateauthorsDto } from './dto/create-authors.dto';
import { UpdateauthorsDto } from './dto/update-authors.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { authors } from './domain/authors';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllauthorsDto } from './dto/find-all-authors.dto';

@ApiTags('Authors')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'authors',
  version: '1',
})
export class authorsController {
  constructor(private readonly authorsService: authorsService) {}

  @Post()
  @ApiCreatedResponse({
    type: authors,
  })
  create(@Body() createauthorsDto: CreateauthorsDto) {
    return this.authorsService.create(createauthorsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(authors),
  })
  async findAll(
    @Query() query: FindAllauthorsDto,
  ): Promise<InfinityPaginationResponseDto<authors>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.authorsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: authors,
  })
  findById(@Param('id') id: string) {
    return this.authorsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: authors,
  })
  update(@Param('id') id: string, @Body() updateauthorsDto: UpdateauthorsDto) {
    return this.authorsService.update(id, updateauthorsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
