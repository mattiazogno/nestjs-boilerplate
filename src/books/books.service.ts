import { authorsService } from '../authors/authors.service';
import { authors } from '../authors/domain/authors';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreatebookDto } from './dto/create-book.dto';
import { UpdatebookDto } from './dto/update-book.dto';
import { bookRepository } from './infrastructure/persistence/book.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { book } from './domain/book';

@Injectable()
export class booksService {
  constructor(
    private readonly authorsService: authorsService,

    // Dependencies here
    private readonly bookRepository: bookRepository,
  ) {}

  async create(createbookDto: CreatebookDto) {
    // Do not remove comment below.
    // <creating-property />
    const authorsObject = await this.authorsService.findById(
      createbookDto.authors.id,
    );
    if (!authorsObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          authors: 'notExists',
        },
      });
    }
    const authors = authorsObject;

    return this.bookRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      authors,

      title: createbookDto.title,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.bookRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: book['id']) {
    return this.bookRepository.findById(id);
  }

  findByIds(ids: book['id'][]) {
    return this.bookRepository.findByIds(ids);
  }

  async update(
    id: book['id'],

    updatebookDto: UpdatebookDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let authors: authors | undefined = undefined;

    if (updatebookDto.authors) {
      const authorsObject = await this.authorsService.findById(
        updatebookDto.authors.id,
      );
      if (!authorsObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            authors: 'notExists',
          },
        });
      }
      authors = authorsObject;
    }

    return this.bookRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      authors,

      title: updatebookDto.title,
    });
  }

  remove(id: book['id']) {
    return this.bookRepository.remove(id);
  }
}
