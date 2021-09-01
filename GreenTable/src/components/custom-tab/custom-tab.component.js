import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import SharedStyles from '../../shared/shared-styles';

const CustomTabComponent = (props) => {
  useEffect(() => {

  }, []);

  return (
    <View style={[SharedStyles.tabBottom, styles.tab]}>
      <Text>Tab</Text>
    </View>
  );
};

export default CustomTabComponent;

const styles = StyleSheet.create({
  tab: {    
    
  }
})
