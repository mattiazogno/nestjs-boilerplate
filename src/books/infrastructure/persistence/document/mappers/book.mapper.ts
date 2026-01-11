import { book } from '../../../../domain/book';
import { authorsMapper } from '../../../../../authors/infrastructure/persistence/document/mappers/authors.mapper';

import { bookSchemaClass } from '../entities/book.schema';

export class bookMapper {
  public static toDomain(raw: bookSchemaClass): book {
    const domainEntity = new book();
    if (raw.authors) {
      domainEntity.authors = authorsMapper.toDomain(raw.authors);
    }

    domainEntity.title = raw.title;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: book): bookSchemaClass {
    const persistenceSchema = new bookSchemaClass();
    if (domainEntity.authors) {
      persistenceSchema.authors = authorsMapper.toPersistence(
        domainEntity.authors,
      );
    }

    persistenceSchema.title = domainEntity.title;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
