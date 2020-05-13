import React, {useState, useEffect} from 'react';
import {
  Container,
  Text,
  ListItem,
  Body,
  Left,
  Icon,
  Button,
  Right,
  ActionSheet,
  List,
  Switch,
  Header,
  Picker,
  Form,
} from 'native-base';
import {SafeAreaView, RefreshControl} from 'react-native';
import {
  getAllShoppingLists,
  archiveShoppingList,
  deleteShoppingList,
} from '../database';
import {useIsFocused} from '@react-navigation/core';

const OPTIONS = ['Edit', 'Archive', 'Delete', 'Cancel'];
const CANCEL_BUTTON_INDEX = 3;
const DESTRUCTIVE_INDEX = 2;

const Current = ({navigation}) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [archived, setArchived] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      reloadData();
    }
  }, [isFocused]);

  const reloadData = async () => {
    try {
      setLoading(true);
      const lists = await getAllShoppingLists(archived);
      setShoppingLists(lists);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, [archived]);

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

  const onEdit = item => {
    let list = {
      name: item.name,
      products: item.products,
      id: item.id,
      archived: item.archived,
    };
    navigation.navigate('EditList', {shoppingList: list});
  };

  const onArchive = async item => {
    try {
      await archiveShoppingList(item.id);
      reloadData();
    } catch (err) {
      console.log(err);
    }
  };

  const onDelete = async item => {
    try {
      await deleteShoppingList(item.id);
      reloadData();
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = item => (
    <ListItem onPress={() => onEdit(item)} icon>
      <Left>
        <Icon
          type="FontAwesome"
          name="shopping-cart"
          style={{
            color: '#2e86de',
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
      {archived ? null : (
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
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1, paddingBottom: 20}}>
        <Header style={{justifyContent: 'space-between'}}>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Your shopping lists"
              iosIcon={
                <Icon
                  name="arrow-dropdown-circle"
                  style={{color: '#10ac84', fontSize: 25}}
                />
              }
              style={{width: undefined}}
              selectedValue={archived}
              onValueChange={value => setArchived(value)}>
              <Picker.Item label="Active" value={false} />
              <Picker.Item label="Archived" value={true} />
            </Picker>
          </Form>
        </Header>
        <List
          dataArray={shoppingLists}
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
              onRefresh={reloadData}
            />
          }
        />
        <Button
          iconLeft
          onPress={() => navigation.navigate('CreateList')}
          style={{width: 150}}>
          <Icon name="add" />
          <Text>New list</Text>
        </Button>
      </Container>
    </SafeAreaView>
  );
};

export default Current;
