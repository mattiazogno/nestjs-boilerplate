import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { authorsService } from './authors.service';
import { authorsController } from './authors.controller';
import { DocumentauthorsPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    DocumentauthorsPersistenceModule,
  ],
  controllers: [authorsController],
  providers: [authorsService],
  exports: [authorsService, DocumentauthorsPersistenceModule],
})
export class authorsModule {}
