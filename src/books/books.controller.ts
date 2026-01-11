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
import { booksService } from './books.service';
import { CreatebookDto } from './dto/create-book.dto';
import { UpdatebookDto } from './dto/update-book.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { book } from './domain/book';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllbooksDto } from './dto/find-all-books.dto';

@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'books',
  version: '1',
})
export class booksController {
  constructor(private readonly booksService: booksService) {}

  @Post()
  @ApiCreatedResponse({
    type: book,
  })
  create(@Body() createbookDto: CreatebookDto) {
    return this.booksService.create(createbookDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(book),
  })
  async findAll(
    @Query() query: FindAllbooksDto,
  ): Promise<InfinityPaginationResponseDto<book>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.booksService.findAllWithPagination({
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
    type: book,
  })
  findById(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: book,
  })
  update(@Param('id') id: string, @Body() updatebookDto: UpdatebookDto) {
    return this.booksService.update(id, updatebookDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
