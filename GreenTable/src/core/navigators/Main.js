import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../shared/constants';
import ActivityScreen from '../../screens/Main/activity/activity.screen';
import GreenCreditScreen from '../../screens/Main/green-credits/green-credit.screen';
import HomeContainerScreen from '../../screens/Main/home-container/home-container';
import RedeemCreditScreen from '../../screens/Main/redeem/redeem.screen';
import CreatePostScreen from '../../screens/Main/create-post/create-post.screen';
import CameraScreen from '../../components/camera/camera';
import ViewComment from '../../components/view_comment/view_comment';


const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTES.HOME} component={HomeContainerScreen} />
      <Stack.Screen name={ROUTES.ACTIVITY} component={ActivityScreen} />
      <Stack.Screen name={ROUTES.GREENCREDEIT} component={GreenCreditScreen} />
      <Stack.Screen name={ROUTES.REDEEM} component={RedeemCreditScreen} />
      <Stack.Screen name={ROUTES.CREATEPOST} component={CreatePostScreen} />
      <Stack.Screen name={ROUTES.CAMERA} component={CameraScreen}/>
      <Stack.Screen name={ROUTES.COMMENT} component={ViewComment}/>
     
    </Stack.Navigator>
  );
};

export default MainStack;
