import React, { useEffect, useState } from "react";
import { ScrollView, View } from 'react-native';
import PostCardComponent from '../../../components/post-card/post-card.component';
import { ROUTES } from '../../../shared/constants/routes';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Follower({ props, post, onPress }) {
  useEffect(() => {
   
  }, []);
 

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ScrollView>
        {post && post.map((item, index) => {
          return <PostCardComponent key={index} post={item} onCommentPress={onPress} props={props} />;
        })}

        {/* empty view for bottom space that is overlapped by bottom tab */}
        <View style={{ height: 70 }}></View>
      </ScrollView>
    </View>
  );
}
