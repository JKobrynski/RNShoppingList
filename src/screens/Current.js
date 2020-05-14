import React, {useState, useEffect} from 'react';
import {Container, Text, Icon, Button} from 'native-base';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {getAllShoppingLists} from '../database';
import {useIsFocused} from '@react-navigation/core';
import {ShoppingLists} from '../components';

const Current = ({navigation}) => {
  const [shoppingLists, setShoppingLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [archived, setArchived] = useState(false);

  const isFocused = useIsFocused();

  // Reload data each time the screen is focused
  useEffect(() => {
    if (isFocused) {
      reloadData();
    }
  }, [isFocused]);

  /**
   * Function that fetches all active or archived shopping lists
   * (depending on archived parameter) and updates current state
   */
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

  /**
   * Reload data each time archived parameter changes
   */
  useEffect(() => {
    reloadData();
  }, [archived]);

  /**
   * Function that switches lists from archived to active
   * (only if archived lists are currently displayed)
   */
  const onActivePress = () => {
    if (archived) {
      setArchived(false);
    } else {
      return;
    }
  };

  /**
   * Function that switches lists from active to archived
   * (only if active lists are currently displayed)
   */
  const onArchivedPress = () => {
    if (!archived) {
      setArchived(true);
    } else {
      return;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={styles.container}>
        <View style={styles.topButtonsContainer}>
          <Button
            style={styles.button}
            bordered={archived}
            onPress={onActivePress}>
            <Text style={styles.buttonLabel}>Active</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={onArchivedPress}
            bordered={!archived}>
            <Text style={styles.buttonLabel}>Archived</Text>
          </Button>
        </View>
        <ShoppingLists
          data={shoppingLists}
          loading={loading}
          onReload={reloadData}
          archived={archived}
        />
        {!archived && (
          <Icon
            type="FontAwesome"
            name="plus-circle"
            style={styles.addButton}
            onPress={() => navigation.navigate('CreateList')}
          />
        )}
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  topButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Montserrat-SemiBold',
  },
  addButton: {
    fontSize: 70,
    color: '#10ac84',
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

export default Current;
