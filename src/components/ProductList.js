import React from 'react';
import {List, ListItem, Body, Text, Right, Icon} from 'native-base';
import ListHeaderComponent from './ListHeaderComponent';

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
