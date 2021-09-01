import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { Color } from '../../shared/utils/colors-pack';
import sharedStyles from '../../shared/shared-styles';

const PostCardComponent = (props) => {

  useEffect(() => {

  }, []);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.post}>{props.post.post}</Text>
        <Image style={[sharedStyles.shadow, styles.postImage]} source={props.post.post_image} />
      </View>
    </View>
  );
};

export default PostCardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8
  },
  card: {
    padding:5
  },
  postImage : {
    maxWidth:'100%',
    borderRadius: 5
  },
  post : {
    marginBottom: 10,
    color: Color.SECONDARY_COLOR,
    lineHeight: 20
  }
})
