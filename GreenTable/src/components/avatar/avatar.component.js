import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { Color } from '../../shared/utils/colors-pack';

const AvatarComponent = (props) => {
  useEffect(() => {

  }, []);

  size = props.size ? props.size : 32;
  border = props.border ? props.border : 0;

  return (
    <View style={styles.border} >

      {
      props.url ? 
      <Image style={{
        borderRadius: size / 2,
        height: size, width: size, 
      }} source= {props.url} />
      : <View style={{
        borderRadius: size / 2,
        height: size, width: size, 
        borderWidth: border,
        backgroundColor: Color.LIGHT_GREEN_10,
        borderColor: 'rgba(255,255,255,.5)'
      }}>

      </View>
    }
    </View>
  );
};

export default AvatarComponent;


const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'rgba(27,29,77, .3)',
    shadowRadius: 4.65,
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: .4
  }
})
