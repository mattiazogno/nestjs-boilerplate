import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { authorsSchema, authorsSchemaClass } from './entities/authors.schema';
import { authorsRepository } from '../authors.repository';
import { authorsDocumentRepository } from './repositories/authors.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: authorsSchemaClass.name, schema: authorsSchema },
    ]),
  ],
  providers: [
    {
      provide: authorsRepository,
      useClass: authorsDocumentRepository,
    },
  ],
  exports: [authorsRepository],
})
export class DocumentauthorsPersistenceModule {}
