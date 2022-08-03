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
import moment from 'moment';
import style from '../../screens/Main/create-post/style';

class ViewComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.route.params.post.commentData
    }

    console.log(this.state)
  }

  render() {
    return (
      <>
        <Text style={styles.allComment}>All Comments</Text>
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator} />
            )
          }}
          keyExtractor={(item) => {
            return item.id;
          }}
          renderItem={(item) => {
            const Notification = item.item;
            return (

              <View style={styles.container}>
                <TouchableOpacity onPress={() => { }}>
                  <Image style={styles.image} source={{ uri: Notification.displayimage }} />
                </TouchableOpacity>
                <View style={styles.content}>
                  <View style={styles.contentHeader}>
                    <Text style={styles.name}>{Notification.displayname}</Text>
                    <Text style={styles.timeAgo}>{moment(Notification.timestamp).startOf('hour').fromNow()} </Text>
                  </View>
                  <Text style={styles.commentText}>{Notification.comment_text}</Text>
                </View>
              </View>

            );
          }} />
      </>
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
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
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
  allComment: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 20,
    textAlign: 'center'
  },
  commentText: {
    fontSize: 16,
  },
  btn: {
    marginRight: 100,
  },
  timeAgo: {
    fontSize: 10,
    marginTop: 5,
    marginLeft: 10
  },

});





export default ViewComment;