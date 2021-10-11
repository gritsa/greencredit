import {StyleSheet, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import {Color} from '../../shared/utils/colors-pack';
import SharedStyles from '../../shared/shared-styles';
import AvatarComponent from '../../components/avatar/avatar.component';
import {FontWeight} from '../../shared/utils/typography-pack';

const BADGE_ICON = require('../../assets/images/badge-blue.png');
const LIKE_ICON = require('../../assets/images/thumbs-up-outline.png');
const LIKEED_ICON = require('../../assets/images/thumbs-up-fill.png');
const COMMENT_ICON = require('../../assets/images/messenger-outline.png');

const windowWidth = Dimensions.get('window').width;

const PostCardComponent = props => {
  useEffect(() => {}, []);

  return (
    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSec}>
          <AvatarComponent
            size={32}
            url={props.post.user_details.profile_pic}></AvatarComponent>
          <View style={styles.userDetails}>
            <View style={styles.nameSec}>
              <Text style={styles.name}>{props.post.user_details.name} </Text>
              <Text style={styles.timeAgo}>{props.post.created_at} </Text>
            </View>
            <Text style={styles.userName}>
              {props.post.user_details.user_name}
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
        <Text style={styles.post}>{props.post.post}</Text>
        <Image
          style={[SharedStyles.shadow, styles.postImage]}
          source={props.post.post_image}
        />
      </View>
      {/* Content end */}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.likeCommentSec}>
          <View style={styles.iconWithText}>
            {props.post.post.is_like ? (
              <Image source={LIKEED_ICON} />
            ) : (
              <Image source={LIKE_ICON} />
            )}
            <Text style={styles.iconText}>{props.post.comment_count}</Text>
          </View>
          <View style={styles.iconWithText}>
            <Image source={COMMENT_ICON} />
            <Text style={styles.iconText}>{props.post.comment_count}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.viewAllText}>
            View all {props.post.comment_count} comments
          </Text>
        </View>
      </View>
      {/* Footer end */}
    </View>
  );
};

export default PostCardComponent;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    color: Color.SECONDARY_COLOR,
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
