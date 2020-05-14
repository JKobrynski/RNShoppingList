import React from 'react';
import {RefreshControl} from 'react-native';
import {
  List,
  Container,
  Text,
  ListItem,
  Left,
  Icon,
  Body,
  Right,
  ActionSheet,
} from 'native-base';
import {useNavigation} from '@react-navigation/core';
import {deleteShoppingList, archiveShoppingList} from '../database';

// Settings for ActionSheet component
const OPTIONS = ['Edit', 'Archive', 'Delete', 'Cancel'];
const CANCEL_BUTTON_INDEX = 3;
const DESTRUCTIVE_INDEX = 2;

const ShoppingLists = ({data, loading, onReload}) => {
  const navigation = useNavigation();

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

  const onEdit = item => {
    let list = {
      name: item.name,
      products: item.products,
      id: item.id,
      archived: item.archived,
    };
    navigation.navigate('EditList', {shoppingList: list});
  };

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

  const onArchive = async item => {
    try {
      await archiveShoppingList(item.id);
      onReload();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  const onDelete = async item => {
    try {
      await deleteShoppingList(item.id);
      onReload();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  const renderItem = item => (
    <ListItem onPress={() => onEdit(item)} icon style={{marginBottom: 10}}>
      <Left>
        <Icon
          type="FontAwesome"
          name="shopping-basket"
          style={{
            color: '#2e86de',
            fontSize: 20,
          }}
        />
      </Left>
      <Body>
        <Text
          style={{
            fontFamily: 'Montserrat-SemiBold',
            color: '#222f3e',
          }}>
          {item.name}
        </Text>
      </Body>
      {item.archived ? null : (
        <Right>
          <Icon
            name="more"
            style={{
              color: '#576574',
              fontSize: 25,
            }}
            onPress={() => showActionSheet(item)}
          />
        </Right>
      )}
    </ListItem>
  );

  return (
    <List
      style={{marginTop: 25}}
      dataArray={data}
      renderRow={item => renderItem(item)}
      keyExtractor={item => item.id.toString()}
      ListEmptyComponent={() => (
        <Container>
          <Text>No current shopping lists</Text>
        </Container>
      )}
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
