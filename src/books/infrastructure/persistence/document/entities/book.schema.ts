import { authorsSchemaClass } from '../../../../../authors/infrastructure/persistence/document/entities/authors.schema';

import mongoose from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now, HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from '../../../../../utils/document-entity-helper';

export type bookSchemaDocument = HydratedDocument<bookSchemaClass>;

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class bookSchemaClass extends EntityDocumentHelper {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'authorsSchemaClass',
    autopopulate: true,
  })
  authors: authorsSchemaClass;

  @Prop({
    type: String,
  })
  title: string;

  @Prop({ default: now })
  createdAt: Date;

  @Prop({ default: now })
  updatedAt: Date;
}

export const bookSchema = SchemaFactory.createForClass(bookSchemaClass);
