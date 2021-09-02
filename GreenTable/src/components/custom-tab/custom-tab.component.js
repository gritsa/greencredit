import { StyleSheet, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { Image, View, TouchableOpacity } from 'react-native';
import SharedStyles from '../../shared/shared-styles';
import { Color } from '../../shared/utils/colors-pack';
import { ROUTES } from '../../shared/constants/routes';

const windowWidth = Dimensions.get('window').width;

const NEW_POST = require('../../assets/images/tab/butotn-new-post.png');
const ACTIVITY = require('../../assets/images/tab/home-active.png');
const CREDIT = require('../../assets/images/tab/credit-active.png');

const CustomTabComponent = (props) => {

  return (
    <View style={[SharedStyles.tabBottom, styles.tab]}>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => props.clickMe(ROUTES.ACTIVITY)}>
          <View style={[styles.activeTabButton, styles.button]}>
            <Image style={styles.activeIcon} source={ACTIVITY} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.clickMe(ROUTES.GREENCREDEIT)}>
          <View style={[styles.button]} >
            <Image style={styles.inactiveIcon} source={CREDIT} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.homeButton}>
        <Image style={styles.activeIcon} source={NEW_POST} />
      </View>
    </View>
  );
};

export default CustomTabComponent;

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  inactiveIcon: {
    opacity: 0.2
  },
  inactiveIcon: {
    opacity: 1
  },
  activeTabButton: {
    backgroundColor: Color.LIGHT_GREEN
  },
  button: {
    maxHeight: 35,
    width: 62,
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  homeButton: {
    position: 'absolute',
    left: (windowWidth / 2) - 27,
    top: -15
  }
})
