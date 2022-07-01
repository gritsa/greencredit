import * as React from 'react';
import {ScrollView, View} from 'react-native';
import PostCardComponent from '../../../components/post-card/post-card.component';
import { ROUTES } from '../../../shared/constants/routes';

export default function Global(props) {
  posts = [
    {
      id: 1,
      user_details: {
        name: 'Pradeep Kumar Sharma',
        user_name: '@omprdq',
        profile_pic: require('../../../assets/images/pradeep.png'),
      },
      post: 'When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.',
      post_image: require('../../../assets/images/sample-post-image.png'),
      created_at: '2 min ago',
      comment_count: 2,
      like_count: 2,
      is_like: true,
    },
  ];
  function onPress ()  {
    this.props.navigation.navigate('ViewComment')
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView>
        {this.posts.map((item, index) => {
          return <PostCardComponent key={item.id} post={item} onCommentPress={onPress}/>;
        })}

        {/* empty view for bottom space that is overlapped by bottom tab */}
        <View style={{height: 70}}></View>
      </ScrollView>
    </View>
  );
}
