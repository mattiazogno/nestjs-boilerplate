import { authors } from '../../../../domain/authors';

import { authorsSchemaClass } from '../entities/authors.schema';

export class authorsMapper {
  public static toDomain(raw: authorsSchemaClass): authors {
    const domainEntity = new authors();
    domainEntity.name = raw.name;

    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: authors): authorsSchemaClass {
    const persistenceSchema = new authorsSchemaClass();
    persistenceSchema.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
