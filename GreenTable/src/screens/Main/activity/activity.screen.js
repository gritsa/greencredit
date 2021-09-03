//***********************//
// Activity Screen
//***********************//
import React from "react";
import { View, Text } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import PopularComponent from '../../../components/popular/popular.component';
import PostCardComponent from '../../../components/post-card/post-card.component';
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../../../shared/utils/colors-pack";
import sharedStyles from "../../../shared/shared-styles";

// images from assets
const PROFILE_PIC = require('../../../assets/images/avatar-1.png');

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
		is_like: true
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
		is_like: false
	  }]

	render() {
		return (

			<View>

				<View style={sharedStyles.header}>
					<View style={sharedStyles.headLeft}></View>
					<Text style={sharedStyles.headTitle}>Activity</Text>
					<View style={sharedStyles.headRight}>
						<AvatarComponent size={32} url={PROFILE_PIC}></AvatarComponent>
						</View>
				</View>

				<View>

					<PopularComponent style={sharedStyles.popularSecHeight}></PopularComponent>
					 
					<View style={{backgroundColor: Color.BODY_BG}}>
						<View style={sharedStyles.activityPostContainer}>
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

			</View>

		)
	}
}

export default ActivityScreen;
