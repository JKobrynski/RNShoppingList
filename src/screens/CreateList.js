import React, {useState} from 'react';
import {Container, Text, Form, Item, Input, Label, Button} from 'native-base';
import {SafeAreaView} from 'react-native';
import {createShoppingList} from '../database/methods';
import {ProductList} from '../components';

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
      .catch(err => alert('Unknown error occured!'));
  };

  const onDeleteProduct = index => {
    setProduct([...products.splice(index, 1)]);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1}}>
        <Form style={{marginBottom: 20}}>
          <Item stackedLabel>
            <Label>List name</Label>
            <Input
              value={listName}
              onChangeText={setListName}
              autoFocus
              onSubmitEditing={() => {
                if (!products.length) {
                  setShowProductInput(true);
                }
              }}
              blurOnSubmit={!!products.length}
            />
          </Item>
        </Form>
        {showProductInput ? (
          <Form style={{marginBottom: 30}}>
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
        <ProductList
          data={products}
          onAddPress={() => setShowProductInput(true)}
          onDeletePress={onDeleteProduct}
          archived={false}
        />
        {listName && products.length ? (
          <Button
            success
            style={{width: 100, marginTop: 20}}
            onPress={onSaveList}>
            <Text>Save</Text>
          </Button>
        ) : null}
      </Container>
    </SafeAreaView>
  );
};

export default CreateList;
