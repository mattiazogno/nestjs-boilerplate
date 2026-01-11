import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { authors } from '../../domain/authors';

export abstract class authorsRepository {
  abstract create(
    data: Omit<authors, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<authors>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<authors[]>;

  abstract findById(id: authors['id']): Promise<NullableType<authors>>;

  abstract findByIds(ids: authors['id'][]): Promise<authors[]>;

  abstract update(
    id: authors['id'],
    payload: DeepPartial<authors>,
  ): Promise<authors | null>;

  abstract remove(id: authors['id']): Promise<void>;
}
