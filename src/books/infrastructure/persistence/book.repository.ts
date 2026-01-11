import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { book } from '../../domain/book';

export abstract class bookRepository {
  abstract create(
    data: Omit<book, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<book>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<book[]>;

  abstract findById(id: book['id']): Promise<NullableType<book>>;

  abstract findByIds(ids: book['id'][]): Promise<book[]>;

  abstract update(
    id: book['id'],
    payload: DeepPartial<book>,
  ): Promise<book | null>;

  abstract remove(id: book['id']): Promise<void>;
}
