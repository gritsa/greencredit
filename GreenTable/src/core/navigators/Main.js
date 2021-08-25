import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ROUTES} from '../../shared/constants';
import {ActivityScreen} from '../../screens/Main/activity/activity.screen';
import {CreatePostScreen} from '../../screens/Main/create-post/create-post.screen';
import {GreenCreditScreen} from '../../screens/Main/green-credits/green-credit.screen';
import {RedeemScreen} from '../../screens/Main/green-credits/green-credit.screen';

const Tab = createBottomTabNavigator();
const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === ROUTES.ACTIVITY) {
            iconName = focused ? 'activity' : 'activity-outline';
          } else if (route.name === ROUTES.GREENCREDEIT) {
            iconName = focused ? 'green-credit' : 'green-credit-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{showLabel: false}}>
      <Tab.Screen name={ROUTES.ACTIVITY} component={ActivityScreen} />
      <Tab.Screen name={ROUTES.CREATEPOST} component={CreatePostScreen} />      
      <Tab.Screen name={ROUTES.GREENCREDEIT} component={GreenCreditScreen} />      
      <Tab.Screen name={ROUTES.REDEEM} component={RedeemScreen} />      
    </Tab.Navigator>
  );
};

export default MainStack;
