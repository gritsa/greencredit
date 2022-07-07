//***********************//
// Comment Box
//***********************//


'use strict';
import { ROUTES } from '../../shared/constants/routes';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Button
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import style from '../../screens/Main/create-post/style';

class ViewComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},{id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},{id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        {id:1, image: "https://www.bootdey.com/app/webroot/img/Content/avatar/avatar1.png", name:"Vikram",    comment:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."},
        
      
      ]
    }
  } 

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return (
            <View style={styles.separator}/>
          )
        }}
        keyExtractor={(item)=>{
          return item.id;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return(
            <View style={styles.container}>
              <TouchableOpacity onPress={() => {}}>
                <Image style={styles.image} source={{uri: Notification.image}}/>
              </TouchableOpacity>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <Text  style={styles.name}>{Notification.name}</Text>          
                </View>
              </View> 
            </View>
          );
        }}/>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop:10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start'
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
  image:{
    width:45,
    height:45,
    borderRadius:20,
    marginLeft:20
  },
  time:{
    fontSize:11,
    color:"#808080",
  },
  name:{
    fontSize:16,
    fontWeight:"bold",
  },
  btn:{
    marginRight: 100,
  }
 
}); 
                            




export default ViewComment;