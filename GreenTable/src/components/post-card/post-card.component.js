import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, Button, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import { Color } from '../../shared/utils/colors-pack';
import SharedStyles from '../../shared/shared-styles';
import AvatarComponent from '../../components/avatar/avatar.component';
import { FontWeight } from '../../shared/utils/typography-pack';
import moment from 'moment';
import { mediaUrl } from '../../shared/constants/api-urls';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { postComment } from '../../core/Redux/actions/PostActions';

const BADGE_ICON = require('../../assets/images/badge-blue.png');
const LIKE_ICON = require('../../assets/images/thumbs-up-outline.png');
const LIKEED_ICON = require('../../assets/images/liked.png');
const COMMENT_ICON = require('../../assets/images/messenger-outline.png');

const windowWidth = Dimensions.get('window').width;

function PostCardComponent({ post, props }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const liked = post.likeData.length;
  const [count, setCount] = useState(LIKE_ICON);
  const [likescount, setLikescount] = useState(liked)

  useEffect(() => {
    setLikeToPost();
  }, []);

  function setLikeToPost() {
    if (post.likeData && post.likeData.length) {
      const like = post.likeData.find(like => like === parseInt(user.user.id));
      if (like) {
        setCount(LIKEED_ICON);
      } else {
        setCount(LIKE_ICON);
      }
    } else {
      setCount(LIKE_ICON);
    }

  }

  function onCommentPress() {
    props.navigation.navigate("COMMENT", { post });
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
  const [text, setText] = useState('');
  const submitText = () => { setText('') }
  async function submitComment() {
    if (text.length > 0) {
      const comments = {
        comment_text: text,
        userId: user.user.id
      }
      const data = {
        activityId: post.id,
        comments: JSON.stringify(comments)
      }
      setIsShown(false);
      dispatch(postComment(data))
        .then((res) => {
          setIsShown(false);
          setText('')
        })
        .catch((error) => {
          Alert.alert('Some error occured');
          console.log(error);
          setIsShown(false);
          setText('')
        });
    }
  }

  cancelComment = () => {
    setIsShown(false);
    setText('')
  }

  return (

    <View style={styles.cardContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftSec}>
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: post.display_image }}
          />
          <View style={styles.userDetails}>
            <View style={styles.nameSec}>
              <Text style={styles.name}>{post.profile_name}</Text>
              {/* <Text style={styles.timeAgo}> </Text> */}
            </View>
            <Text style={styles.userName}>
              {moment(post.timestamp).startOf('hour').fromNow()}
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
        {post && post.post_text.length > 0 && (
          <Text style={styles.post}>{post.post_text}</Text>
        )}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}>
          {post && post.images.length > 0 && post.images.map((item, index) => {
            return <Image key={index} style={[SharedStyles.shadow, styles.postImage]} source={{ uri: mediaUrl(item) }} />;
          })}

        </ScrollView>
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
            <Text style={styles.iconText}>{post.commentData.length}</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={onCommentPress}>
            {post && post.commentData.length > 0 && (
              <Text style={styles.viewAllText}>
                View all {post.commentData.length} comments
              </Text>
            )}
          </TouchableOpacity>

        </View>
      </View>
      {isShown && <View style={styles.containerr}>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Image
              style={{ width: 30, height: 30, marginTop: 10, borderRadius: 50 }}
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
                onPress={cancelComment}
              />
            </View>
          </View>
        </View>
      </View>
      }
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
    fontSize: 10,
    marginTop: 2
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
    width: 280,
    height: 350,
    borderRadius: 5,
    margin: 10
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
