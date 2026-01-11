import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authorsSchemaClass } from '../entities/authors.schema';
import { authorsRepository } from '../../authors.repository';
import { authors } from '../../../../domain/authors';
import { authorsMapper } from '../mappers/authors.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class authorsDocumentRepository implements authorsRepository {
  constructor(
    @InjectModel(authorsSchemaClass.name)
    private readonly authorsModel: Model<authorsSchemaClass>,
  ) {}

  async create(data: authors): Promise<authors> {
    const persistenceModel = authorsMapper.toPersistence(data);
    const createdEntity = new this.authorsModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return authorsMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<authors[]> {
    const entityObjects = await this.authorsModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      authorsMapper.toDomain(entityObject),
    );
  }

  async findById(id: authors['id']): Promise<NullableType<authors>> {
    const entityObject = await this.authorsModel.findById(id);
    return entityObject ? authorsMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: authors['id'][]): Promise<authors[]> {
    const entityObjects = await this.authorsModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      authorsMapper.toDomain(entityObject),
    );
  }

  async update(
    id: authors['id'],
    payload: Partial<authors>,
  ): Promise<NullableType<authors>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.authorsModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.authorsModel.findOneAndUpdate(
      filter,
      authorsMapper.toPersistence({
        ...authorsMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? authorsMapper.toDomain(entityObject) : null;
  }

  async remove(id: authors['id']): Promise<void> {
    await this.authorsModel.deleteOne({ _id: id });
  }
}
