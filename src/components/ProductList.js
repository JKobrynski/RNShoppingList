import React from 'react';
import {List, ListItem, Body, Text, Right, Icon} from 'native-base';
import ListHeaderComponent from './ListHeaderComponent';

/**
 *
 * @typedef {Product}
 * @param {number} id - product id
 * @param {string} name - product name
 */

/**
 *
 * @typedef {Props}
 * @param {Array.<Product>} data - products array
 * @param {function} onAddPress - function to get called when add button is pressed
 * @param {function} onDeletePress - function to get called when delete button is pressed
 * @param {boolean} archived - weather parent shopping list is archived or not
 */

/**
 *
 * @param {Props} props
 */
const ProductList = ({data, onAddPress, onDeletePress, archived}) => {
  const renderRow = (item, index) => (
    <ListItem icon>
      <Body>
        <Text
          style={{
            fontFamily: 'Montserrat-Medium',
            color: '#222f3e',
          }}>
          {item.name}
        </Text>
      </Body>
      {archived ? null : (
        <Right>
          <Icon
            name="close"
            type="FontAwesome"
            style={{
              color: '#ee5253',
            }}
            onPress={() => onDeletePress(index)}
          />
        </Right>
      )}
    </ListItem>
  );

  return (
    <List
      contentContainerStyle={{paddingBottom: 20}}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      dataArray={data}
      renderItem={({item, index}) => renderRow(item, index)}
      keyExtractor={item => item.id.toString()}
      ListHeaderComponent={
        <ListHeaderComponent onPress={onAddPress} showButton={!archived} />
      }
    />
  );
};

export default ProductList;
