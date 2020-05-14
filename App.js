import React from 'react';
import {Root} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import MainStackNavigator from './src/navigation';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings([
  'Non-serializable values were found in the navigation state',
]);

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
