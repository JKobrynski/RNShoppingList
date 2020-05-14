import React, {useState, useLayoutEffect} from 'react';
import {Container, Text, Form, Item, Input, Label, Button} from 'native-base';
import {SafeAreaView, StyleSheet} from 'react-native';
import {createShoppingList} from '../database/methods';
import {ProductList} from '../components';

const CreateList = ({navigation}) => {
  const [listName, setListName] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductInput, setShowProductInput] = useState(false);
  const [product, setProduct] = useState('');

  // Render custom header button
  const renderHeaderButton = () => {
    return listName && products.length ? (
      <Button transparent onPress={() => onSaveList()}>
        <Text>Save</Text>
      </Button>
    ) : null;
  };

  // Set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderButton,
    });
  }, [navigation, listName, products]);

  // List saving method
  const onSaveList = async () => {
    try {
      const newShoppingList = {
        id: Math.floor(Date.now() / 1000),
        name: listName ? listName : Date.now(),
        products: products,
        created: new Date(),
      };

      await createShoppingList(newShoppingList);
      navigation.goBack();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  /**
   *
   * @param {number} index - index in products array
   */
  const onDeleteProduct = index => {
    setProducts([...products.filter((item, i) => i !== index)]);
  };

  // Submit name
  const onSubmitName = () => {
    if (!products.length) {
      setShowProductInput(true);
    }
  };

  // Add product to products list
  const onSubmitProduct = () => {
    if (product.trim().length) {
      let newProduct = {
        name: product.trim(),
        id: Math.floor(Date.now()),
      };
      setProducts([newProduct, ...products]);
      setProduct('');
    }
  };

  // Clean and hide input on blur
  const onBlurProduct = () => {
    setShowProductInput(false);
    setProduct('');
  };

  // Handle add button press
  const onAddPress = () => {
    if (showProductInput) {
      onSubmitProduct();
    } else {
      setShowProductInput(true);
    }
  };

  return (
    <SafeAreaView style={styles.flex}>
      <Container style={styles.flex}>
        <Form style={styles.nameForm}>
          <Item stackedLabel>
            <Label>List name</Label>
            <Input
              style={styles.nameInput}
              value={listName}
              onChangeText={setListName}
              autoFocus
              onSubmitEditing={onSubmitName}
              blurOnSubmit={!!products.length}
            />
          </Item>
        </Form>
        {showProductInput ? (
          <Form style={styles.productForm}>
            <Item>
              <Input
                style={styles.productInput}
                value={product}
                onChangeText={setProduct}
                autoFocus
                blurOnSubmit={false}
                onSubmitEditing={onSubmitProduct}
                onBlur={onBlurProduct}
              />
            </Item>
          </Form>
        ) : null}
        <ProductList
          data={products}
          onAddPress={onAddPress}
          onDeletePress={onDeleteProduct}
          archived={false}
        />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  nameForm: {
    marginBottom: 20,
  },
  nameInput: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#222f3e',
  },
  productForm: {
    backgroundColor: '#c8d6e5',
  },
  productInput: {
    borderBottomColor: '#576574',
    borderBottomWidth: 1,
    marginRight: 16,
  },
});

export default CreateList;
