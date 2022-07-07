import { StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Color } from '../../shared/utils/colors-pack';
import SharedStyles from '../../shared/shared-styles';
import AvatarComponent from '../../components/avatar/avatar.component';
import { FontWeight } from '../../shared/utils/typography-pack';
import { ROUTES } from '../../shared/constants/routes';
import CommentScreen from '../comment/comment';
import ViewComment from '../view_comment/view_comment';
import moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from 'react-redux';

const BADGE_ICON = require('../../assets/images/badge-blue.png');
const LIKE_ICON = require('../../assets/images/thumbs-up-outline.png');
const LIKEED_ICON = require('../../assets/images/liked.png');
const COMMENT_ICON = require('../../assets/images/messenger-outline.png');

const windowWidth = Dimensions.get('window').width;

function PostCardComponent({ post, onCommentPress }) {
  const user = useSelector((state) => state.user);
  const liked = post.likes.length;
  const [count, setCount] = useState(LIKE_ICON);
  const [likescount, setLikescount] = useState(liked)

  useEffect(() => {
    setLikeToPost();
  }, []);

  function setLikeToPost() {
    if (post.likes.length) {
      const like = post.likes.find(like => like === parseInt(user.user.id));
      if (like) {
        setCount(LIKEED_ICON);
      } else {
        setCount(LIKE_ICON);
      }
    } else {
      setCount(LIKE_ICON);
    }

  }

  const onPresss = () => {
    if (count == LIKE_ICON) {
      setCount(LIKEED_ICON);
      setLikescount(liked + 1);
    }

    else if (count == LIKEED_ICON) {
      setCount(LIKE_ICON);
      setLikescount(liked);
    }
  }
  


  const [isShown, setIsShown] = useState(false);
  const onTap = () => setIsShown(current => !current);

  return (

    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSec}>
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: user.user.display_picture }}
          />
          <View style={styles.userDetails}>
            <View style={styles.nameSec}>
              <Text style={styles.name}>ghgh</Text>
              <Text style={styles.timeAgo}>{moment(post.timestamp).startOf('hour').fromNow()} </Text>
            </View>
            <Text style={styles.userName}>
              hhghj
            </Text>
          </View>
        </View>

        <View style={styles.rightSec}>
          <Image source={BADGE_ICON} />
        </View>
      </View>
      {/* Header end */}

      {/* Content */}
      <View style={styles.card}>
        <Text style={styles.post}>{post.post_text}</Text>
        {/* {post && post.photos_urls && (
          <Image
            style={[SharedStyles.shadow, styles.postImage]}
            source={post.photos_urls}
          />
        )} */}
      </View>
      {/* Content end */}

      {/* Footer */}

      <View style={styles.footer}>
        <View style={styles.likeCommentSec}>
          <TouchableOpacity onPress={onPresss}>
            <View style={styles.iconWithText}>
              <Image style={{ width: 15, height: 15 }} source={count}></Image>
              <Text style={styles.iconText}>{likescount}</Text>
            </View></TouchableOpacity>


          <View style={styles.iconWithText}>
            <TouchableOpacity onPress={onTap}>
              <Image source={COMMENT_ICON} /></TouchableOpacity>
            <Text style={styles.iconText}>{post.comments.length}</Text>

          </View>

        </View>
        <View>
          <TouchableOpacity onPress={onCommentPress}>
            <Text style={styles.viewAllText}>
              View all {post.comments.length} comments
            </Text></TouchableOpacity>
        </View>
      </View>
      {isShown && <CommentScreen />}
      {/* Footer end */}
    </View>
  );
};

export default PostCardComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    color: Color.SECONDARY_COLOR,
    width: 320,
  },
  card: {
    padding: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  leftSec: {
    maxWidth: windowWidth - 80,
    display: 'flex',
    flexDirection: 'row',
  },
  userDetails: {
    display: 'flex',
    paddingLeft: 12,
  },
  nameSec: {
    display: 'flex',
    flexDirection: 'row',
  },
  name: {
    fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD,
    color: Color.SECONDARY_COLOR,
  },
  userName: {
    fontWeight: '300',
    color: Color.GRAY_DARK,
  },
  timeAgo: {
    paddingLeft: 5,
    fontWeight: FontWeight.FONT_WEIGHT_BOLD,
    color: Color.GRAY,
    fontSize: 10,
    marginTop: 5,
    marginLeft: 5
  },
  rightSec: {
    width: 22,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'flex-end',
  },
  postImage: {
    maxWidth: '100%',
    borderRadius: 5,
  },
  post: {
    marginBottom: 10,
    color: Color.SECONDARY_COLOR,
    lineHeight: 20,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  likeCommentSec: {
    display: 'flex',
    flexDirection: 'row',
  },
  iconWithText: {
    display: 'flex',
    flexDirection: 'row',
    paddingRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: Color.GRAY_MEDIUM,
    fontSize: 13,
    paddingLeft: 3,
  },
  viewAllText: {
    color: Color.GRAY_MEDIUM,
    fontSize: 13,
    fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD,
  },
});
