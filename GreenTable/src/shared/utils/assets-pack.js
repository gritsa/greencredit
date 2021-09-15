import {Assets} from 'react-native-ui-lib';

// add your assets here
Assets.loadAssetsGroup('appImages', {
  logo: require('../../assets/images/logo.png'),
  icon: require('../../assets/images/icon.png'),  
  signinBg: require('../../assets/images/signin-bg.png'),
  greenMask: require('../../assets/images/green-mask.png'),
  getStarted1: require('../../assets/images/get-started-1.png'),
});
