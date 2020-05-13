import React, {useState, useEffect} from 'react';
import {Root} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import {Current, EditList, Archived, CreateList} from './src/screens';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Current"
      component={Current}
      options={{
        headerTitle: 'Shopping Lists',
      }}
    />
    <Stack.Screen
      name="EditList"
      component={EditList}
      options={{
        headerTitle: 'Edit List',
      }}
    />
    <Stack.Screen name="Archived" component={Archived} />
    <Stack.Screen name="CreateList" component={CreateList} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <Root>
      <NavigationContainer>
        <MainStackNavigator />
      </NavigationContainer>
    </Root>
  );
};

export default App;
