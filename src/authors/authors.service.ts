import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreateauthorsDto } from './dto/create-authors.dto';
import { UpdateauthorsDto } from './dto/update-authors.dto';
import { authorsRepository } from './infrastructure/persistence/authors.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { authors } from './domain/authors';

@Injectable()
export class authorsService {
  constructor(
    // Dependencies here
    private readonly authorsRepository: authorsRepository,
  ) {}

  async create(createauthorsDto: CreateauthorsDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.authorsRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      name: createauthorsDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.authorsRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: authors['id']) {
    return this.authorsRepository.findById(id);
  }

  findByIds(ids: authors['id'][]) {
    return this.authorsRepository.findByIds(ids);
  }

  async update(
    id: authors['id'],

    updateauthorsDto: UpdateauthorsDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.authorsRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      name: updateauthorsDto.name,
    });
  }

  remove(id: authors['id']) {
    return this.authorsRepository.remove(id);
  }
}
