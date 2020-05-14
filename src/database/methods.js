import {SHOPPINGLIST_SCHEMA, dbOptions} from './schemas';

/**
 *
 * @typedef {Product}
 * @param {number} id - product id
 * @param {string} name - product name
 */

/**
 *
 * @typedef {ShoppingList}
 * @param {number} id - shopping list id
 * @param {string} name - shopping list name
 * @param {date} created - creation date
 * @param {Array.<Product>} products - products array
 * @param {boolean} archived - indicates weather shopping list is archived or not
 */

/**
 * Method that saves a new shopping list to database
 * @param {ShoppingList} newShoppingList - new shopping list object
 * @returns {Promise.<ShoppingList>}
 */
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

/**
 * Method that updates existing shopping list in database
 * @param {ShoppingList} shoppingList - updated shopping list object
 * @returns {Promise}
 */
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

/**
 * Method that archives existing shopping list
 * @param {number} shoppingListId - list id
 * @returns {Promise}
 */
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

/**
 * Method that deletes shopping list from database
 * @param {number} shoppingListId - list id
 * @returns {Promise}
 */
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

/**
 * Method that retrieves shopping lists from database
 * @param {boolean} archived - indicates type of shopping lists to retrieve, archived or active(default)
 * @returns {Promise.<ShoppingList>}
 */
export const getAllShoppingLists = (archived = false) =>
  new Promise((resolve, reject) => {
    Realm.open(dbOptions)
      .then(realm => {
        let allShoppingLists = realm
          .objects(SHOPPINGLIST_SCHEMA)
          .filtered(`archived = ${archived}`)
          .sorted('created', true);
        resolve(allShoppingLists);
      })
      .catch(error => reject(error));
  });
