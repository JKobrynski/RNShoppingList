import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Current, EditList, CreateList} from '../screens';
const Stack = createStackNavigator();

export default MainStackNavigator = () => (
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
    <Stack.Screen name="CreateList" component={CreateList} />
  </Stack.Navigator>
);
