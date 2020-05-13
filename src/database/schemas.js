import Realm from 'realm';
export const SHOPPINGLIST_SCHEMA = 'ShoppingListSchema';
export const PRODUCT_SCHEMA = 'Product';

export const ProductSchema = {
  name: PRODUCT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: {type: 'string', indexed: true},
  },
};

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

export const dbOptions = {
  schema: [ProductSchema, ShoppingListSchema],
  schemaVersion: 6,
};

// export const createShoppingList = newShoppingList =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           realm.create(SHOPPINGLIST_SCHEMA, newShoppingList);
//           resolve(newShoppingList);
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const updateShoppingList = shoppingList =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           let updatingShoppingList = realm.objectForPrimaryKey(
//             SHOPPINGLIST_SCHEMA,
//             shoppingList.id,
//           );
//           updatingShoppingList.name = shoppingList.name;
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const archiveShoppingList = shoppingList =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           let updatingShoppingList = realm.objectForPrimaryKey(
//             SHOPPINGLIST_SCHEMA,
//             shoppingList.id,
//           );
//           updatingShoppingList.archived = true;
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const deleteShoppingList = shoppingListId =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         realm.write(() => {
//           let deletingShoppingList = realm.objectForPrimaryKey(
//             SHOPPINGLIST_SCHEMA,
//             shoppingListId,
//           );
//           realm.delete(deletingShoppingList);
//           resolve();
//         });
//       })
//       .catch(error => reject(error));
//   });

// export const getAllShoppingLists = () =>
//   new Promise((resolve, reject) => {
//     Realm.open(dbOptions)
//       .then(realm => {
//         let allShoppingLists = realm.objects(SHOPPINGLIST_SCHEMA);
//         resolve(allShoppingLists);
//       })
//       .catch(error => reject(error));
//   });

export default new Realm(dbOptions);
