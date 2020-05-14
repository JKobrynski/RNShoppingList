import Realm from 'realm';
export const SHOPPINGLIST_SCHEMA = 'ShoppingListSchema';
export const PRODUCT_SCHEMA = 'Product';

// Database schema for single product
export const ProductSchema = {
  name: PRODUCT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
  },
};

// Database schema for single shopping list
export const ShoppingListSchema = {
  name: SHOPPINGLIST_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', default: new Date()},
    created: {type: 'date', default: new Date()},
    products: {type: 'list', objectType: PRODUCT_SCHEMA},
    archived: {type: 'bool', default: false},
  },
};

// Database settings
export const dbOptions = {
  schema: [ProductSchema, ShoppingListSchema],
  schemaVersion: 6,
};

export default new Realm(dbOptions);
