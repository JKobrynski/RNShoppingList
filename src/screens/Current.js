import React, {useState, useEffect} from 'react';
import {Container, Text, Icon, Button} from 'native-base';
import {SafeAreaView, View} from 'react-native';
import {getAllShoppingLists} from '../database';
import {useIsFocused} from '@react-navigation/core';
import {ShoppingLists} from '../components';

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
      alert('Unknown error occured!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadData();
  }, [archived]);

  const onActivePress = () => {
    if (archived) {
      setArchived(false);
    } else {
      return;
    }
  };

  const onArchivedPress = () => {
    if (!archived) {
      setArchived(true);
    } else {
      return;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1, paddingVertical: 20}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingVertical: 10,
            paddingHorizontal: 16,
          }}>
          <Button
            style={{width: 150, alignItems: 'center', justifyContent: 'center'}}
            bordered={archived}
            onPress={onActivePress}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Active
            </Text>
          </Button>
          <Button
            style={{width: 150, alignItems: 'center', justifyContent: 'center'}}
            onPress={onArchivedPress}
            bordered={!archived}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
              }}>
              Archived
            </Text>
          </Button>
        </View>
        <ShoppingLists
          data={shoppingLists}
          loading={loading}
          onReload={reloadData}
        />
        <Icon
          type="FontAwesome"
          name="plus-circle"
          style={{
            fontSize: 70,
            color: '#10ac84',
            position: 'absolute',
            bottom: 30,
            right: 20,
          }}
          onPress={() => navigation.navigate('CreateList')}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Current;
