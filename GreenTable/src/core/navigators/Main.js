// import React from 'react';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {ROUTES} from '../../shared/constants';
// import {ActivityScreen} from '../../screens/Main/activity/activity.screen';
// import {GreenCreditScreen} from '../../screens/Main/green-credits/green-credit.screen';

// const Tab = createBottomTabNavigator();
// const MainStack = () => {
//   return (
//     <Tab.Navigator headerMode="none"    
//       tabBarOptions={{showLabel: false}}>
//       <Tab.Screen name={ROUTES.ACTIVITY} component={ActivityScreen} />      
//       <Tab.Screen name={ROUTES.GREENCREDEIT} component={GreenCreditScreen} />                
//     </Tab.Navigator>
//   );
// };

// export default MainStack;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from '../../shared/constants';
import IntroScreen from '../../screens/Auth/intro/intro.screen';
import SigninScreen from '../../screens/Auth/signin/singin.screen';
import SplashScreen from '../../screens/Auth/splash/splash.screen';


const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={ROUTES.INTRO} component={IntroScreen} />      
      <Stack.Screen name={ROUTES.SIGNIN} component={SigninScreen} />                       
    </Stack.Navigator>
  );
};

export default MainStack;

