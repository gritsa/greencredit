import * as React from 'react';
import {
  ScrollView,
  Animated,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from 'react-native';
import sharedStyles from '../../../shared/shared-styles';
import {Color} from '../../../shared/utils/colors-pack';
import PostCardComponent from '../../../components/post-card/post-card.component';
const {width, height} = Dimensions.get('screen');

const postsArray = {
  follower: [
    {
      id: 2,
      user_details: {
        name: 'Pradeep Kumar',
        user_name: '@pradeepkr',
        profile_pic: require('../../../assets/images/pradeep.png'),
      },
      post: 'When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself. When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.',
      post_image: require('../../../assets/images/sample-post-image.png'),
      created_at: '5 min ago',
      comment_count: 3,
      like_count: 2,
      is_like: false,
    },
    {
      id: 22,
      user_details: {
        name: 'Aashish Patil',
        user_name: '@aashishp',
        profile_pic: require('../../../assets/images/pradeep.png'),
      },
      post: 'When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.',
      post_image: require('../../../assets/images/sample-post-image.png'),
      created_at: '5 min ago',
      comment_count: 3,
      like_count: 2,
      is_like: false,
    },
  ],
  local: [
    {
      id: 2,
      user_details: {
        name: 'Aashish',
        user_name: '@aashish',
        profile_pic: require('../../../assets/images/pradeep.png'),
      },
      post: 'When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.',
      post_image: require('../../../assets/images/sample-post-image.png'),
      created_at: '5 min ago',
      comment_count: 3,
      like_count: 2,
      is_like: false,
    },
  ],
  global: [
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
  ],
};

const data = Object.keys(postsArray).map(i => ({
  key: i,
  title: i,
  posts: postsArray[i],
  ref: React.createRef(),
}));


const Indicator = ({measures, scrollX}) => {
  const inputRange = data.map((item, i) => i * width);
  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.width),
  });
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map(measure => measure.x),
  });
  return (
    <Animated.View
      style={{
        position: 'absolute',
        borderTopEndRadius: 6,
        borderTopStartRadius: 6,
        height: 3,
        width: indicatorWidth,
        backgroundColor: Color.PRIMARY_COLOR,
        bottom: 0,
        left: 0,
        transform: [
          {
            translateX,
          },
        ],
      }}></Animated.View>
  );
};
const Tab = React.forwardRef(({item, onItemPress}, ref) => {  
    return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            fontWeight: '500',
            textTransform: 'uppercase',
            paddingVertical: 13,
            opacity: 0.7,
            fontSize: 15,
            color: Color.SECONDARY_COLOR,
          }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

const Tabs = ({data, scrollX, onItemPress}) => {
  const [measures, setMeasures] = React.useState([]);
  const containerRef = React.useRef();
  React.useEffect(() => {
    let m = [];
    data.forEach(item => {
    console.log(item.ref.current.width);
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {            
            m.push({
                x,
                y,
                width,
                height,
            });
          if (m.length === data.length) {           
            setMeasures(m);
          }          
        },
      );
    });    
  }, []);
  return (
    <View
      style={{
        position: 'absolute',
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
        height: 44,
        width: '100%',
        top: 0,
        backgroundColor: '#fff',
      }}>
      <View
        ref={containerRef}
        style={{justifyContent: 'space-evenly', flex: 1, flexDirection: 'row'}}>
        {data.map((item, index) => {   
            console.log(data.length);
          return (
            <Tab
              key={item.key}
              item={item}
              ref={item.ref}
              onItemPress={() => onItemPress(index)}></Tab>
          );
        })}
      </View>
      {measures.length > 0 && (
        
        <Indicator measures={measures} scrollX={scrollX} />

      )}
    </View>
  );
};

export default function Pager() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const ref = React.useRef();
  onItemPress = React.useCallback(itemIndex => {
    console.log('index App',itemIndex);
    ref?.current?.scrollToOffset({
      offset: itemIndex * width,
    });
  });
  return (
    <View style={sharedStyles.pagerBox}>
      <Animated.FlatList
        data={data}
        ref={ref}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={item => item.key}
        renderItem={({item}) => {
          return (
            <View style={{paddingTop: 44, width: width}}>
              <View style={sharedStyles.pagerBox}>
                <ScrollView>
                  {item.posts.map((item, index) => {
                    return <PostCardComponent key={item.id} post={item} />;
                  })}

                  {/* empty box added for footer buffer spacing */}
                  <View style={{height: 70, width: 70}}></View>
                </ScrollView>
              </View>
            </View>
          );
        }}></Animated.FlatList>

      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  );
}
