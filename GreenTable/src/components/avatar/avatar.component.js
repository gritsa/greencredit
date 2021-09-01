import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';

const AvatarComponent = (props) => {
  useEffect(() => {

  }, []);

  size = props.size ? props.size : 32

  return (
    <View>
      <Image style={styles.shadow, {
        borderRadius: size / 2,
        height: size, width: size
      }} source={props.url} />
    </View>
  );
};

export default AvatarComponent;


const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(27,29,77, .05)',
    shadowRadius: 4.65,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 10
  }
})
