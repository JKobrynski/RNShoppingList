import React from 'react';
import {RefreshControl, View, TouchableOpacity} from 'react-native';
import {List, Text, Icon, ActionSheet} from 'native-base';
import {useNavigation} from '@react-navigation/core';
import {deleteShoppingList, archiveShoppingList} from '../database';
import ListEmptyComponent from './ListEmptyComponent';

// Settings for ActionSheet component
const OPTIONS = ['Edit', 'Archive', 'Delete', 'Cancel'];
const CANCEL_BUTTON_INDEX = 3;
const DESTRUCTIVE_INDEX = 2;

/**
 *
 * @typedef Product
 * @property {number} id - product id
 * @property {string} name - product name
 */

/**
 *
 * @typedef ShoppingList
 * @property {number} id - list id
 * @property {string} name - list name
 * @property {boolean} archived - weather list is archived or not
 * @property {Array.<Product>} products - array of products
 */

/**
 *
 * @typedef {Props}
 * @param {Array<ShoppingList>} data - data array from database
 * @param {boolean} loading - loading indication param
 * @param {function} onReload - reloading function (refetching data)
 * @param {boolean} archived - paramaeter that idicates weather the user is currently
 * viewing archived or active shopping lists
 */

/**
 *
 * @param {Props} props
 */
const ShoppingLists = props => {
  const {data, loading, onReload, archived} = props;
  const navigation = useNavigation();

  /**
   *
   * @param {ShoppingList} item
   */
  const showActionSheet = item => {
    ActionSheet.show(
      {
        options: OPTIONS,
        cancelButtonIndex: CANCEL_BUTTON_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: `${item.name}`,
      },
      buttonIndex => handleButtonPress(buttonIndex, item),
    );
  };

  /**
   *
   * @param {ShoppingList} item
   */
  const onEdit = item => {
    let list = {
      name: item.name,
      products: item.products,
      id: item.id,
      archived: item.archived,
    };
    navigation.navigate('EditList', {shoppingList: list});
  };

  /**
   *
   * @param {number} index - button index
   * @param {ShoppingList} item
   */
  const handleButtonPress = (index, item) => {
    switch (index) {
      case 0:
        onEdit(item);
        break;
      case 1:
        onArchive(item);
        break;
      case 2:
        onDelete(item);
        break;
      default:
        return;
    }
  };

  /**
   *
   * @param {ShoppingList} item
   */
  const onArchive = async item => {
    try {
      await archiveShoppingList(item.id);
      onReload();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  /**
   *
   * @param {ShoppingList} item
   */
  const onDelete = async item => {
    try {
      await deleteShoppingList(item.id);
      onReload();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  /**
   *
   * @param {Date} date - date to parse
   */
  const parseDate = date => {
    const dt = new Date(date);
    return dt.toLocaleDateString('pl-EU');
  };

  /**
   *
   * @param {number} num - number of products
   */
  const getNumOfProducts = num => {
    return `${num} product${num > 1 ? 's' : ''}`;
  };

  /**
   *
   * @param {ShoppingList} item
   */
  const renderItem = item => (
    <TouchableOpacity
      onPress={() => onEdit(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderTopWidth: 0.5,
        borderTopWidth: 0.5,
        marginHorizontal: 8,
        borderTopColor: '#8395a7',
      }}>
      <View style={{flexDirection: 'column', flex: 1}}>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#222f3e',
            fontSize: 18,
            marginBottom: 10,
          }}
          numberOfLines={1}>
          {item.name}
        </Text>
        <Text numberOfLines={1}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: '#576574',
              fontSize: 16,
            }}>
            {parseDate(item.created)}
          </Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: '#2e86de',
              fontSize: 16,
            }}>
            {'  '}
            {getNumOfProducts(item.products.length)}
          </Text>
        </Text>
      </View>
      {!item.archived && (
        <Icon
          name="more-vert"
          type="MaterialIcons"
          style={{
            color: '#576574',
            fontSize: 25,
          }}
          onPress={() => showActionSheet(item)}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <List
      style={{marginTop: 25}}
      dataArray={data}
      renderRow={item => renderItem(item)}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={
        <ListEmptyComponent
          text={`No ${archived ? 'archived' : 'active'} shopping lists`}
        />
      }
      refreshControl={
        <RefreshControl
          colors="#10ac84"
          tintColor="#10ac84"
          refreshing={loading}
          onRefresh={onReload}
        />
      }
    />
  );
};

export default ShoppingLists;
