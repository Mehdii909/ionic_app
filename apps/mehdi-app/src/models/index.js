// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Porduct, Produit } = initSchema(schema);

export {
  Porduct,
  Produit
};