import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '../../shared/constants';
import ActivityScreen from '../../screens/Main/activity/activity.screen';
import GreenCreditScreen from '../../screens/Main/green-credits/green-credit.screen';
import HomeContainerScreen from '../../screens/Main/home-container/home-container';
import RedeemScreen from '../../screens/Main/redeem/redeem.screen';
import CreatePostScreen from '../../screens/Main/create-post/create-post.screen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTES.HOME} component={HomeContainerScreen} />
      <Stack.Screen name={ROUTES.ACTIVITY} component={ActivityScreen} />
      <Stack.Screen name={ROUTES.GREENCREDEIT} component={GreenCreditScreen} />
      <Stack.Screen name={ROUTES.REDEEM} component={RedeemScreen} />
      <Stack.Screen name={ROUTES.CREATEPOST} component={CreatePostScreen} />
    </Stack.Navigator>
  );
};

export default MainStack;
