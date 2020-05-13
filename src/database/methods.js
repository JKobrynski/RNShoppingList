import {
  SHOPPINGLIST_SCHEMA,
  PRODUCT_SCHEMA,
  dbOptions,
  ProductSchema,
  ShoppingListSchema,
} from './schemas';

export const createShoppingList = newShoppingList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(SHOPPINGLIST_SCHEMA, newShoppingList);
          resolve(newShoppingList);
        });
      })
      .catch(error => reject(error));
  });

export const updateShoppingList = shoppingList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingShoppingList = realm.objectForPrimaryKey(
            SHOPPINGLIST_SCHEMA,
            shoppingList.id,
          );
          updatingShoppingList.name = shoppingList.name;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const archiveShoppingList = shoppingList =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingShoppingList = realm.objectForPrimaryKey(
            SHOPPINGLIST_SCHEMA,
            shoppingList.id,
          );
          updatingShoppingList.archived = true;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const deleteShoppingList = shoppingListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let deletingShoppingList = realm.objectForPrimaryKey(
            SHOPPINGLIST_SCHEMA,
            shoppingListId,
          );
          realm.delete(deletingShoppingList);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const getAllShoppingLists = () =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allShoppingLists = realm.objects(SHOPPINGLIST_SCHEMA);
        resolve(allShoppingLists);
      })
      .catch(error => reject(error));
  });
