import {StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {Image, View, TouchableOpacity} from 'react-native';
import SharedStyles from '../../shared/shared-styles';
import {Color} from '../../shared/utils/colors-pack';
import {ROUTES} from '../../shared/constants/routes';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const NEW_POST = require('../../assets/images/tab/butotn-new-post.png');
const ACTIVITY = require('../../assets/images/tab/home-active.png');
const CREDIT = require('../../assets/images/tab/credit-active.png');

const CustomTabComponent = props => {
  const navigation = useNavigation();
  const [currentRoute, setCurrentState] = useState(ROUTES.ACTIVITY);

  const navigate = ROUTE => {
    setCurrentState(ROUTE);
    props.clickMe(ROUTE);
  };
  return (
    <View style={[SharedStyles.tabBottom, styles.tab, styles.bottomTab]}>
      <View style={styles.tab}>
        <TouchableOpacity onPress={() => navigate(ROUTES.ACTIVITY)}>
          <View
            style={[
              currentRoute === ROUTES.ACTIVITY ? styles.activeTabButton : '',
              styles.button,
            ]}>
            <Image
              style={
                currentRoute === ROUTES.ACTIVITY
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
              source={ACTIVITY}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate(ROUTES.GREENCREDEIT)}>
          <View
            style={[
              currentRoute === ROUTES.GREENCREDEIT
                ? styles.activeTabButton
                : '',
              styles.button,
            ]}>
            <Image
              style={
                currentRoute === ROUTES.GREENCREDEIT
                  ? styles.activeIcon
                  : styles.inactiveIcon
              }
              source={CREDIT}
            />
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate(ROUTES.CREATEPOST)}>
        <View >
          <Image style={styles.activeIcon} source={NEW_POST} />
        </View>
      </TouchableOpacity>
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
    width: '100%',
  },
  bottomTab: {
    marginTop: 50,
  },
  inactiveIcon: {
    opacity: 0.2,
  },
  activeIcon: {
    opacity: 1,
  },
  activeTabButton: {
    backgroundColor: Color.LIGHT_GREEN,
  },
  button: {
    height: 35,
    width: 62,
    borderRadius: 18,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    position: 'absolute',
    left: windowWidth / 2 - 27,
    top: -15,
  },
});
