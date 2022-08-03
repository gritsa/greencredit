//***********************//
// Activity Screen
//***********************//
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image } from 'react-native';
import AvatarComponent from '../../../components/avatar/avatar.component';
import PopularComponent from '../../../components/popular/popular.component';
import PostCardComponent from '../../../components/post-card/post-card.component';
import { ScrollView } from 'react-native-gesture-handler';
import { Color } from '../../../shared/utils/colors-pack';
import sharedStyles from '../../../shared/shared-styles';
import HeadTabs from '../tabs/head-tabs';
import axios from 'axios';
import Follower from "../tabs/follower";
import Global from "../tabs/global";
import Local from "../tabs/local";
import { useSelector } from 'react-redux';


// images from assets
const PROFILE_PIC = require('../../../assets/images/avatar-1.png');

function ActivityScreen({ props }) {
  const user = useSelector((state) => state.user);
  const [view, setView] = useState('Followers');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      setInterval(() => {
        getPosts();
      }, 2000);
  }, []);

  const getPosts = async () => {
    await axios.get(`http://54.148.23.236:805/api/get/activities/`)
      .then(res => {
        const data = [];
        res.data.forEach(element => {
          data.push({
            ...element,
            likeData: JSON.parse(element.likes),
            commentData: JSON.parse(element.comments),
            images: JSON.parse(element.photo_urls),
          })
        });
        setPosts(data);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
        console.log('false to get posts');
      }
      );
  }


  function onPress() {
    props.navigation.navigate("COMMENT");
  }

  function renderTabs() {
    switch (view) {
      case 'Followers':
        return <Follower post={posts} props={props} onPress={onPress} />;
      case 'Global':
        return <Global post={posts} props={props} onPress={onPress} />;
      case 'Local':
        return <Local post={posts} props={props} onPress={onPress} />;
      default:
        break;
    }
  }

  return (
    <View>
      <View style={sharedStyles.header}>
        <View style={sharedStyles.headLeft} />
        <Text style={sharedStyles.headTitle}>Activity</Text>
        <View style={sharedStyles.headRight}>
          <Image
            style={{ width: 32, height: 32 }}
            source={{ uri: user.user.display_picture }}
          />
        </View>
      </View>

      <View>

        <PopularComponent style={sharedStyles.popularSecHeight} />
        <View style={{ backgroundColor: Color.BODY_BG }}>
          <View style={sharedStyles.activityPostContainer}>
            <View style={sharedStyles.activityPostHeader}>
              {['Followers', 'Global', 'Local'].map((item, index) => {
                return (
                  <Pressable onPress={() => setView(item)}>
                    <Text style={item === view ? { color: '#348565', fontWeight: 'bold' } : { color: '#000' }} >{item}</Text>
                  </Pressable>
                )
              })}
            </View>
            {renderTabs()}
          </View>
        </View>
      </View>
    </View>
  );
}

export default ActivityScreen;
