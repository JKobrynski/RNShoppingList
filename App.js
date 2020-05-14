import React from 'react';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigation';

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
