import React, {useState, useEffect} from 'react';
import {Container, Text} from 'native-base';
const Realm = require('realm');
import {createStackNavigator} from '@react-navigation/stack';
import {Current, EditList, Archived} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Current" component={Current} />
    <Stack.Screen name="EditList" component={EditList} />
    <Stack.Screen name="Archived" component={Archived} />
  </Stack.Navigator>
);

const App = () => {
  // const [myRealm, setMyRealm] = useState(null);

  // const CarSchema = {
  //   name: 'Car',
  //   properties: {
  //     make: 'string',
  //     model: 'string',
  //     miles: {type: 'int', default: 0},
  //   },
  // };

  // const ShoppingListSchema = {
  //   name: 'ShoppingList',
  //   properties: {
  //     name: {type: 'string', default: new Date()},
  //     products: {type: 'string[]'},
  //     created: {type: 'date', default: new Date()},
  //     archived: {type: 'bool', default: false},
  //   },
  // };

  // useEffect(() => {
  //   Realm.open({schema: [ShoppingListSchema], schemaVersion: 4}).then(realm => {
  //     setMyRealm(realm);
  //   });

  //   return () => myRealm.close();
  // }, []);

  // useEffect(() => {
  //   if (myRealm) {
  //     const allLists = myRealm.objects('ShoppingList');
  //     console.log(allLists);
  //     // let firstList = myRealm
  //     //   .objects('ShoppingList')
  //     //   .filtered('name = "First one"');
  //     // console.log(firstList[0]);

  //     // myRealm.write(() => {
  //     //   firstList[0].products.push('NEW PROUDCT');
  //     // });

  //     if (Object.keys(allLists).length === 2) {
  //       myRealm.write(() => {
  //         myRealm.create('ShoppingList', {
  //           name: 'Third one',
  //           products: ['sugar', 'salt', 'pepper'],
  //         });
  //       });
  //     }
  //   }
  // }, [myRealm]);

  // useEffect(() => {
  //   Realm.open({schema: [CarSchema], schemaVersion: 2}).then(realm => {
  //     setMyRealm(realm);
  //     // realm.write(() => {
  //     //   const myCar = realm.create('Car', {
  //     //     make: 'Suzuki',
  //     //     model: 'Swift',
  //     //     miles: 40000,
  //     //   });
  //     // });

  //     // console.log(realm);
  //   });
  //   return () => myRealm.close();
  // }, []);

  // useEffect(() => {
  //   if (myRealm) {
  //     //console.log(myRealm.objects('Car'));
  //     // const allCars = myRealm.objects('Car');
  //     // console.log(allCars);

  //     myRealm.write(() => {
  //       const allCars = myRealm.objects('Car');

  //       console.log(allCars);
  //       //console.log(Object.keys(allCars).length);
  //       if (Object.keys(allCars).length === 0) {
  //         myRealm.create('Car', {
  //           make: 'Suzuki',
  //           model: 'Swift',
  //           miles: 10000,
  //         });
  //       }
  //     });
  //   }
  //}, [myRealm]);

  // return (
  //   <Container style={{alignItems: 'center', justifyContent: 'center'}}>
  //     <Text>Elo</Text>
  //   </Container>
  // );

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

export default App;
