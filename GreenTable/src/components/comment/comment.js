//***********************//
// Comment Box
//***********************//


'use strict';
import { ROUTES } from '../../shared/constants/routes';
import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';

import style from '../../screens/Main/create-post/style';
import { useSelector } from 'react-redux';
import axios from 'axios';

function CameraScreen({ postId, isShow}) {
  const user = useSelector((state) => state.user);
  const [text, setText] = useState('');
  const submitText = () => { setText('') }
  async function submitComment() {
    const comments = {
      comment_text: text,
      userId: user.user.id
    }
    const data = {
      activityId: postId,
      comments: JSON.stringify(comments)
    }
    await axios.post(`http://54.148.23.236:805/api/comments/`, data)
      .then(res => {
        console.log(res);
        isShow = false;
      })
      .catch(err => {
        Alert.alert('Some error occured');
        console.log(err);
        isShow = false;
      }
      );

  }
  console.log(postId);
  return (
    <View style={styles.containerr}>
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Image
            style={{ width: 30, height: 30, marginTop: 10 }}
            source={{ uri: user.user.display_picture }}
          />
          <TextInput
            multiline
            style={styles.input} placeholder="Comment..."
            placeholderTextColor={'black'}
            value={text}
            maxLength={1000}
            onChangeText={(text) => setText(text)}
          />
        </View>

        <View style={styles.container}>

        </View>


        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonStyle}>
            <Button title={"Submit"} color='black' onPress={submitComment} />

          </View>
          <View style={styles.buttonStyle}>
            <Button title={"Cancel"}
              color='black'
              style={styles.submit}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  containerr: {
    flex: 1,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    marginBottom: 6
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 5
  },
  btn: {
    marginRight: 100,
  },
  input: {
    margin: 12,
    padding: 10,

  },
  input: {
    borderColor: "white",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
  },
  submit: {
    backgroundColor: '#68a0cf',
    overflow: 'hidden',
    marginLeft: 10
  },
  buttonStyle: {
    marginLeft: 10,
  }

});





export default CameraScreen;