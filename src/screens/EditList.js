import React, {useState, useEffect} from 'react';
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
  Body,
  Left,
  Icon,
  Right,
  List,
} from 'native-base';
import {SafeAreaView} from 'react-native';
import {
  updateShoppingList,
  deleteShoppingList,
  archiveShoppingList,
} from '../database/methods';

const EditList = ({navigation, route}) => {
  const [listName, setListName] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductInput, setShowProductInput] = useState(false);
  const [product, setProduct] = useState('');
  const [listId, setListId] = useState(null);

  useEffect(() => {
    if (route.params) {
      if (route.params.shoppingList) {
        const {shoppingList: savedList} = route.params;
        setListName(savedList.name);
        setProducts([...savedList.products]);
        setListId(savedList.id);
      }
    }
  }, []);

  const onEditList = async () => {
    try {
      const editedShoppingList = {
        id: listId,
        name: listName,
        products: products,
      };

      await updateShoppingList(editedShoppingList);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteList = async () => {
    try {
      await deleteShoppingList(listId);
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const onArchiveList = () => {
    archiveShoppingList(listId)
      .then(() => navigation.goBack())
      .catch(err => console.log(err));
  };

  const renderRow = (item, index) => (
    <ListItem icon>
      <Left>
        <Icon
          name="plus-circle"
          type="FontAwesome"
          style={{
            color: '#2e86de',
          }}
        />
      </Left>
      <Body>
        <Text>{item.name}</Text>
      </Body>
      <Right>
        <Icon
          name="close"
          type="FontAwesome"
          style={{
            color: '#ee5253',
          }}
          onPress={() => setProduct([...products.splice(index, 1)])}
        />
      </Right>
    </ListItem>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Content>
          <Form style={{marginBottom: 20}}>
            {/* <Item floatingLabel> */}
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
          <List
            dataArray={products}
            renderRow={(item, index) => renderRow(item, index)}
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
            <>
              <Icon
                type="FontAwesome"
                name="plus-circle"
                style={{
                  fontSize: 70,
                  color: '#1dd1a1',
                }}
                onPress={() => setShowProductInput(true)}
              />
              <Button
                success
                style={{width: 100, marginTop: 20}}
                onPress={onEditList}>
                <Text>Save</Text>
              </Button>
              <Button
                danger
                style={{width: 100, marginTop: 20}}
                onPress={onDeleteList}>
                <Text>Delete</Text>
              </Button>
              <Button
                primary
                style={{width: 100, marginTop: 20}}
                onPress={onArchiveList}>
                <Text>Archive</Text>
              </Button>
            </>
          ) : null}
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default EditList;
