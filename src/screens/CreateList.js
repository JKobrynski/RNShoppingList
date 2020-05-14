import React, {useState} from 'react';
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  Label,
  Content,
  ListItem,
  Button,
} from 'native-base';
import {SafeAreaView, FlatList} from 'react-native';
import {createShoppingList} from '../database/methods';

const CreateList = ({navigation}) => {
  const [listName, setListName] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductInput, setShowProductInput] = useState(false);
  const [product, setProduct] = useState('');

  const onSaveList = () => {
    const newShoppingList = {
      id: Math.floor(Date.now() / 1000),
      name: listName ? listName : Date.now(),
      products: products,
    };

    createShoppingList(newShoppingList)
      .then(list => navigation.goBack())
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Content>
          <Form style={{marginBottom: 20}}>
            <Item stackedLabel>
              <Label>List name</Label>
              <Input
                value={listName}
                onChangeText={setListName}
                autoFocus
                onSubmitEditing={() => setShowProductInput(true)}
              />
            </Item>
          </Form>
          <FlatList
            data={products}
            renderItem={({item}) => (
              <ListItem>
                <Text>{item.name}</Text>
              </ListItem>
            )}
            keyExtractor={item => item.id.toString()}
          />
          {showProductInput ? (
            <Form>
              <Item>
                <Input
                  value={product}
                  onChangeText={setProduct}
                  autoFocus
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    if (product) {
                      let newProduct = {
                        name: product,
                        id: Math.floor(Date.now() / 1000),
                      };
                      setProducts([...products, newProduct]);
                      setProduct('');
                    }
                  }}
                  onBlur={() => {
                    setShowProductInput(false);
                    setProduct('');
                  }}
                />
              </Item>
            </Form>
          ) : null}
          {listName && products.length ? (
            <Button
              success
              style={{width: 100, marginTop: 20}}
              onPress={onSaveList}>
              <Text>Save</Text>
            </Button>
          ) : null}
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default CreateList;
