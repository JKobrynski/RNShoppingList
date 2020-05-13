import {SHOPPINGLIST_SCHEMA, PRODUCT_SCHEMA, dbOptions} from './schemas';

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
          updatingShoppingList.products = shoppingList.products;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const archiveShoppingList = shoppingListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        realm.write(() => {
          let updatingShoppingList = realm.objectForPrimaryKey(
            SHOPPINGLIST_SCHEMA,
            shoppingListId,
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

export const getAllShoppingLists = (archived = false) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allShoppingLists = realm
          .objects(SHOPPINGLIST_SCHEMA)
          //.filtered('archived = false');
          .filtered(`archived = ${archived}`)
          .sorted('created', true);
        resolve(allShoppingLists);
      })
      .catch(error => reject(error));
  });

export const filterShoppingLists = searchQuery =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let filteredLists = realm
          .objects(SHOPPINGLIST_SCHEMA)
          .filtered(`name CONTAINS[c] "${searchQuery}"`);
        resolve(filteredLists);
      })
      .catch(err => reject(err));
  });

export const insertProducts = (shoppingListId, newProducts) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let shoppingList = realm.objectForPrimaryKey(
          SHOPPINGLIST_SCHEMA,
          shoppingListId,
        );

        realm.write(() => {
          for (var index in newProducts) {
            shoppingList.products.push(newProducts[index]);
          }

          resolve(newProducts);
        });
      })
      .catch(err => reject(err));
  });

export const getProductsFromList = shoppingListId =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let shoppingList = realm.objectForPrimaryKey(
          SHOPPINGLIST_SCHEMA,
          shoppingListId,
        );
        resolve(shoppingList.products);
      })
      .catch(err => reject(err));
  });
