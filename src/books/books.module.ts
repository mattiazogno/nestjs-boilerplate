import { authorsModule } from '../authors/authors.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { booksService } from './books.service';
import { booksController } from './books.controller';
import { DocumentbookPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    authorsModule,

    // do not remove this comment
    DocumentbookPersistenceModule,
  ],
  controllers: [booksController],
  providers: [booksService],
  exports: [booksService, DocumentbookPersistenceModule],
})
export class booksModule {}
