import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AuthStack from './Auth';
import MainStack from './Main';
import { isUserLoggedIn } from "./../Redux/actions/UserActions";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function AppNavigator() {
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth && auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth]);
  // const token = AsyncStorage.getItem("token");
  return (<NavigationContainer>{auth && auth.authenticate ? <MainStack /> : <AuthStack />}</NavigationContainer>);
}
