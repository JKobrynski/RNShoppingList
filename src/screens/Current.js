import React, {useState, useEffect} from 'react';
import {Container, Text, ListItem, Body, Left, Icon} from 'native-base';
import {FlatList} from 'react-native';
import {getAllShoppingLists} from '../database';

let exampleShoppingLists = [];

for (let i = 0; i < 10; i++) {
  exampleShoppingLists.push({
    id: i,
    name: `${i + 1} shopping list`,
    created: new Date(),
    products: [
      {
        id: i + 1,
        name: 'Milk',
      },
      {
        id: i * i + 1,
        name: 'Bread',
      },
      {
        id: i * i * i + 1,
        name: 'Butter',
      },
      {
        id: i * i * i * i + 1,
        name: 'Eggs',
      },
    ],
    archived: false,
  });
}

const Current = ({navigation}) => {
  const [shoppingLists, setShoppingLists] = useState(exampleShoppingLists);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = () => {
    getAllShoppingLists()
      .then(lists => {
        console.log(lists);
      })
      .catch(err => console.log(err));
  };

  const renderItem = item => (
    <ListItem onPress={() => navigation.navigate('EditList')} button icon>
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
        <Text>{item.name}</Text>
      </Body>
    </ListItem>
  );

  return (
    <Container style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        style={{flex: 1, width: '100%'}}
        data={shoppingLists}
        renderItem={({item}) => renderItem(item)}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
};

export default Current;
