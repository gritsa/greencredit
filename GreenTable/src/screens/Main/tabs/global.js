import * as React from 'react';
import {ScrollView, View} from 'react-native';
import PostCardComponent from '../../../components/post-card/post-card.component';
import { ROUTES } from '../../../shared/constants/routes';

export default function Global({ props, post, onPress }) {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        {post && post.map((item, index) => {
          return <PostCardComponent key={item.id} post={item} onCommentPress={onPress}/>;
        })}

        {/* empty view for bottom space that is overlapped by bottom tab */}
        <View style={{height: 70}}></View>
      </ScrollView>
    </View>
  );
}
