import React, {useState, useEffect} from 'react';
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  Label,
  ListItem,
  Button,
  Body,
  Icon,
  Right,
  List,
  Separator,
  Grid,
  Row,
  Col,
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
  const [archived, setArchived] = useState(false);

  useEffect(() => {
    if (route.params) {
      if (route.params.shoppingList) {
        const {shoppingList: savedList} = route.params;
        setListName(savedList.name);
        setProducts([...savedList.products]);
        setListId(savedList.id);
        setArchived(savedList.archived);
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
            onPress={() => setProduct([...products.splice(index, 1)])}
          />
        </Right>
      )}
    </ListItem>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1}}>
        <Form style={{marginBottom: 20}}>
          <Item stackedLabel>
            <Label>List name</Label>
            <Input
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
        {showProductInput && !archived ? (
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
        <List
          dataArray={products}
          renderRow={(item, index) => renderRow(item, index)}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <Separator
              style={{
                marginTop: 20,
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingRight: 12,
              }}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: '#576574',
                  fontSize: 14,
                }}>
                PRODUCTS
              </Text>
              {!archived && (
                <Icon
                  type="FontAwesome"
                  name="plus-circle"
                  style={{
                    fontSize: 30,
                    color: '#2e86de',
                  }}
                  onPress={() => setShowProductInput(true)}
                />
              )}
            </Separator>
          }
        />
        {listName && products.length && !archived && !showProductInput ? (
          <Grid style={{paddingHorizontal: 16, marginTop: 20}}>
            <Row>
              <Col style={{alignItems: 'center'}}>
                <Button success onPress={onEditList}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                    }}>
                    Save
                  </Text>
                </Button>
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Button danger onPress={onDeleteList}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                    }}>
                    Delete
                  </Text>
                </Button>
              </Col>
              <Col style={{alignItems: 'center'}}>
                <Button primary onPress={onArchiveList}>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-SemiBold',
                      fontSize: 18,
                    }}>
                    Archive
                  </Text>
                </Button>
              </Col>
            </Row>
          </Grid>
        ) : null}
      </Container>
    </SafeAreaView>
  );
};

export default EditList;
