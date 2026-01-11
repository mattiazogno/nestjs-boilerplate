import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bookSchemaClass } from '../entities/book.schema';
import { bookRepository } from '../../book.repository';
import { book } from '../../../../domain/book';
import { bookMapper } from '../mappers/book.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class bookDocumentRepository implements bookRepository {
  constructor(
    @InjectModel(bookSchemaClass.name)
    private readonly bookModel: Model<bookSchemaClass>,
  ) {}

  async create(data: book): Promise<book> {
    const persistenceModel = bookMapper.toPersistence(data);
    const createdEntity = new this.bookModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return bookMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<book[]> {
    const entityObjects = await this.bookModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      bookMapper.toDomain(entityObject),
    );
  }

  async findById(id: book['id']): Promise<NullableType<book>> {
    const entityObject = await this.bookModel.findById(id);
    return entityObject ? bookMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: book['id'][]): Promise<book[]> {
    const entityObjects = await this.bookModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      bookMapper.toDomain(entityObject),
    );
  }

  async update(
    id: book['id'],
    payload: Partial<book>,
  ): Promise<NullableType<book>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.bookModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.bookModel.findOneAndUpdate(
      filter,
      bookMapper.toPersistence({
        ...bookMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? bookMapper.toDomain(entityObject) : null;
  }

  async remove(id: book['id']): Promise<void> {
    await this.bookModel.deleteOne({ _id: id });
  }
}
