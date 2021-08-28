import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../shared/constants';
import IntroScreen from '../../screens/Auth/intro/intro.screen';
import SigninScreen from '../../screens/Auth/signin/singin.screen';
import SplashScreen from '../../screens/Auth/splash/splash.screen';


const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.INTRO} component={IntroScreen} />      
      <Stack.Screen name={ROUTES.SIGNIN} component={SigninScreen} />                       
    </Stack.Navigator>
  );
};

export default AuthStack;
