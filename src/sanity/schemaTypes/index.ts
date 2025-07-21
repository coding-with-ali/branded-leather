import { type SchemaTypeDefinition } from 'sanity';
import {product} from './product'
import categoryType from './categoryType';
import { orderType } from './orderType';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType,orderType,product],
};
