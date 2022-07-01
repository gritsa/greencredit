import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import {Provider} from 'react-redux';
// import {PersistGate} from 'redux-persist/es/integration/react';
// import {getPersistor} from '@rematch/persist';

// load store
import {store} from './src/core/Redux/store';
// load routes
import AppNavigator from './src/core/navigators';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {ROUTES} from './src/shared/constants/routes';
import IntroScreen from './src/screens/Auth/intro/intro.screen';
import SigninScreen from './src/screens/Auth/signin/singin.screen';
import SplashScreen from './src/screens/Auth/splash/splash.screen';

// load app configurations
import './src/shared/utils/assets-pack';
import './src/shared/utils/colors-pack';
import './src/shared/utils/typography-pack';
import SplashScreen from 'react-native-splash-screen'

export default function App() {
  useEffect(()=>{
    SplashScreen.hide();
  },[])
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={getPersistor()}>
        <AppNavigator />
    //   </PersistGate>
    // </Provider>
  );
}
