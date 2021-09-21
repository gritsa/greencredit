//***********************//
// Home Container Screen
//***********************//
import React from 'react';
import {StatusBar, View, SafeAreaView} from 'react-native';
import ActivityScreen from '../activity/activity.screen';
import GreenCreditScreen from '../green-credits/green-credit.screen';
import CustomTabComponent from '../../../components/custom-tab/custom-tab.component';
import {ROUTES} from '../../../shared/constants/routes';
import sharedStyles from '../../../shared/shared-styles';
import {StyleSheet} from 'react-native';

class HomeContainerScreen extends React.Component {
  state = {
    currentState: ROUTES.ACTIVITY,
  };
  handleClick = data => {
    this.setState({currentState: data});
  };
  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar />

        <View style={sharedStyles.container}>
          {this.state.currentState === ROUTES.ACTIVITY ? (
            <ActivityScreen />
          ) : (
            <GreenCreditScreen />
          )}
        </View>

        <CustomTabComponent clickMe={this.handleClick} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    display: 'flex',
    flex: 1,
    position: 'relative',
    backgroundColor: 'white',
    height: '100%',
  },
});
export default HomeContainerScreen;
