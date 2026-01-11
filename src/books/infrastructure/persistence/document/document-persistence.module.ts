import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { bookSchema, bookSchemaClass } from './entities/book.schema';
import { bookRepository } from '../book.repository';
import { bookDocumentRepository } from './repositories/book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: bookSchemaClass.name, schema: bookSchema },
    ]),
  ],
  providers: [
    {
      provide: bookRepository,
      useClass: bookDocumentRepository,
    },
  ],
  exports: [bookRepository],
})
export class DocumentbookPersistenceModule {}
