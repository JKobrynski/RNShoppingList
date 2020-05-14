import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  Label,
  Button,
  ActionSheet,
  Icon,
} from 'native-base';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {
  updateShoppingList,
  deleteShoppingList,
  archiveShoppingList,
} from '../database/methods';
import {ProductList} from '../components';

// Settings for ActionSheet component
const OPTIONS = ['Archive', 'Delete', 'Cancel'];
const CANCEL_BUTTON_INDEX = 2;
const DESTRUCTIVE_INDEX = 1;

const EditList = ({navigation, route}) => {
  const [listName, setListName] = useState('');
  const [products, setProducts] = useState([]);
  const [showProductInput, setShowProductInput] = useState(false);
  const [product, setProduct] = useState('');
  const [listId, setListId] = useState(null);
  const [archived, setArchived] = useState(false);

  // Extract shopping list from route params (passed from Current screen)
  useEffect(() => {
    if (route.params) {
      if (route.params.shoppingList) {
        const {shoppingList: savedList} = route.params;

        // Set state values based on received  object
        setListName(savedList.name);
        setProducts([...savedList.products]);
        setListId(savedList.id);
        setArchived(savedList.archived);
      }
    }
  }, []);

  // Set navigation options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderButton,
    });
  }, [navigation, listName, listId, products]);

  // Show action sheet
  const showActionSheet = () => {
    ActionSheet.show(
      {
        options: OPTIONS,
        cancelButtonIndex: CANCEL_BUTTON_INDEX,
        destructiveButtonIndex: DESTRUCTIVE_INDEX,
        title: listName,
      },
      buttonIndex => handleButtonPress(buttonIndex),
    );
  };

  /**
   * Handle button press (ActionSheet)
   * @param {number} index - button index
   */
  const handleButtonPress = index => {
    switch (index) {
      case 0:
        onArchiveList();
        break;
      case 1:
        onDeleteList();
        break;
      default:
        return;
    }
  };

  // Render custom header button
  const renderHeaderButton = () => {
    return listName && products.length && !archived ? (
      <Button transparent onPress={() => onEditList()}>
        <Text>Save</Text>
      </Button>
    ) : null;
  };

  // Save edited shopping list to database
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
      alert('Unknown error occured!');
    }
  };

  // Delete shopping list from database
  const onDeleteList = async () => {
    try {
      await deleteShoppingList(listId);
      navigation.goBack();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  // Archive shopping list
  const onArchiveList = async () => {
    try {
      await archiveShoppingList(listId);
      navigation.goBack();
    } catch (err) {
      alert('Unknown error occured!');
    }
  };

  /**
   * Delete a product from products array
   * @param {number} index - product index
   */
  const onDeleteProduct = index => {
    setProduct([...products.splice(index, 1)]);
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
        <View style={styles.nameInputContainer}>
          <Form style={styles.flex}>
            <Item stackedLabel>
              <Label style={styles.label}>List name</Label>
              <Input
                style={styles.nameInput}
                value={listName}
                onChangeText={setListName}
                onSubmitEditing={() => {
                  if (!products.length) {
                    setShowProductInput(true);
                  }
                }}
                blurOnSubmit={!!products.length}
                editable={!archived}
              />
            </Item>
          </Form>
          {!archived && (
            <Icon
              name="more-vert"
              type="MaterialIcons"
              style={styles.moreIcon}
              onPress={() => showActionSheet()}
            />
          )}
        </View>
        {showProductInput && !archived ? (
          <Form style={styles.productForm}>
            <Item>
              <Input
                style={styles.productInput}
                value={product}
                onChangeText={setProduct}
                autoFocus
                blurOnSubmit={false}
                onSubmitEditing={onSubmitProduct}
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
          onAddPress={onAddPress}
          onDeletePress={onDeleteProduct}
          archived={archived}
        />
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  nameInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Montserrat-Medium',
    color: '#576574',
  },
  nameInput: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#222f3e',
  },
  moreIcon: {
    color: '#576574',
    fontSize: 30,
    paddingHorizontal: 10,
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

export default EditList;
