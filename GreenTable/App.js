import React from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';

import SplashScreen from './src/screens/splash/splash.screen';
 
const App = () => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />      
      <SplashScreen />      
    </SafeAreaView>
  );
};
 
export default App;
