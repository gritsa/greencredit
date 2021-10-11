import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Follower from '../tabs/follower';
import Local from '../tabs/local';
import Global from '../tabs/global';
import {Color} from '../../../shared/utils/colors-pack';

const Tab = createMaterialTopTabNavigator();

const tabBarOptions = {
  activeTintColor: Color.SECONDARY_COLOR,
  // inactiveTintColor:'#D3D3D3',
  style: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    borderTopColor: '#D3D3D3',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  indicatorStyle: {
    width: 60,
    marginLeft: 33,
    borderBottomWidth: 3,
    borderColor: Color.PRIMARY_COLOR,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
  },
};

export default function HeadTabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen name="FOLLOWER" component={Follower} />
        <Tab.Screen name="LOCAL" component={Local} />
        <Tab.Screen name="GLOBAL" component={Global} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
