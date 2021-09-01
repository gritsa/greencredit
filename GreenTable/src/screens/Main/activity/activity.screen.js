//***********************//
// Activity Screen
//***********************//
import React from "react";
import { View, Text } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import SharedStyle from '../../../shared/shared-styles';
import PopularComponent from '../../../components/popular/popular.component';
import PostCardComponent from '../../../components/post-card/post-card.component';
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../../../shared/utils/colors-pack";

// images from assets
const PROFILE_PIC = require('../../../assets/images/pradeep.png');

class ActivityScreen extends React.Component {

	posts = [{
		id: 1,
		user_details : {
		  name : 'Pradeep Kumar Sharma',
		  user_name : '@omprdq',
		  profile_pic : require('../../../assets/images/pradeep.png')
		},
		post: 'When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.',
		post_image : require('../../../assets/images/sample-post-image.png'),
		created_at : '2 min ago',
		comment_count : 2,
		like_count : 2,
	  },{
		id: 2,
		user_details : {
		  name : 'Pradeep Kumar',
		  user_name : '@pradeepkr',
		  profile_pic : require('../../../assets/images/pradeep.png')
		},
		post: 'When true, the scroll view bounces horizontally when it reaches the end even if the content is smaller than the scroll view itself.',
		post_image : require('../../../assets/images/sample-post-image.png'),
		created_at : '5 min ago',
		comment_count : 3,
		like_count : 2,
	  }]

	render() {
		return (

			<View style={SharedStyle.container}>

				<View style={SharedStyle.header}>
					<View style={SharedStyle.headLeft}></View>
					<Text style={SharedStyle.headTitle}>Activity</Text>
					<View style={SharedStyle.headRight}>
						<AvatarComponent size={32} url={PROFILE_PIC}></AvatarComponent>
						</View>
				</View>

				<View>
					<PopularComponent></PopularComponent>
					
					
					<View style={{backgroundColor: Color.BODY_BG}}>
						<ScrollView>
						{
							this.posts.map((item, index) => {
							return <PostCardComponent key={item.id} post={item}></PostCardComponent>
							})
						}  
						</ScrollView>
					</View>
					
				</View>

			</View>

		)
	}
}

export default ActivityScreen;
