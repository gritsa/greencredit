//***********************//
// Activity Screen
//***********************//
import React from 'react';
import {View, Text} from 'react-native';
import AvatarComponent from '../../../components/avatar/avatar.component';
import PopularComponent from '../../../components/popular/popular.component';
import PostCardComponent from '../../../components/post-card/post-card.component';
import {ScrollView} from 'react-native-gesture-handler';
import {Color} from '../../../shared/utils/colors-pack';
import sharedStyles from '../../../shared/shared-styles';
import Pager from '../activity/pager';

// images from assets
const PROFILE_PIC = require('../../../assets/images/avatar-1.png');

class ActivityScreen extends React.Component {
  
  render() {
    return (
      <View>
        <View style={sharedStyles.header}>
          <View style={sharedStyles.headLeft} />
          <Text style={sharedStyles.headTitle}>Activity</Text>
          <View style={sharedStyles.headRight}>
            <AvatarComponent size={32} url={PROFILE_PIC} />
          </View>
        </View>

        <View>
          <PopularComponent style={sharedStyles.popularSecHeight} />

          <View style={{backgroundColor: Color.BODY_BG}}>
            
            <Pager />
 
          </View>
        </View>
      </View>
    );
  }
}

export default ActivityScreen;
