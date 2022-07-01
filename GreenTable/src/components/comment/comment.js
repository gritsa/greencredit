//***********************//
// Comment Box
//***********************//


'use strict';
import { ROUTES } from '../../shared/constants/routes';
import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
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

class CameraScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };

  }
  submitText = () => {  this.setState({text : ''}) }

  render() {
  

    return (
      
      
      <View style={styles.containerr}>
     
          
          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Text style={styles.name}>Vikram</Text>

            </View>

            <View style={styles.container}>
              <TextInput 
              multiline
              style={styles.input} placeholder="Comment..." 
                placeholderTextColor={'black'}
                value={this.state.text}
                maxLength={1000}
                numberOfLines={10}
                onChangeText={(text) => this.setState({text})}
                />
            </View>


            <View style={{ flexDirection: "row" }}>
              <View style={styles.buttonStyle}>
                <Button title={"Submit"} color='black' />

              </View>
              <View style={styles.buttonStyle}>
                <Button title={"Cancel"}
                  color='black'
                  style={styles.submit}
                  onPress={() => this.submitText()}
                  />

              </View>
            </View>





          </View>
         
      </View>
     
    

    );

  }
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
  containerr :{
    flex: 1,
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    marginRight: 100,
  },
  input: {
    height: 40,
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
  submit :{
    backgroundColor: '#68a0cf',
    overflow: 'hidden',
 },

});





export default CameraScreen;