import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import AuthStack from './Auth';
import MainStack from './Main';

const AppNavigator = () => {
  const token = useSelector((state) => state.auth.token);
  return <NavigationContainer>{!token ? <MainStack /> : <AuthStack />}</NavigationContainer>;
};

export default AppNavigator;
