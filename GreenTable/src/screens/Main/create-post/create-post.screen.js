//***********************//
// Create Post Screen
//***********************//
import React from "react";
import { TouchableOpacity, SafeAreaView, StatusBar, View, Text, Image, TextInput, Alert } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import { ScrollView } from "react-native-gesture-handler";
import SharedStyles from "../../../shared/shared-styles";
import styles from './style';
import { Color } from "../../../shared/utils/colors-pack";

const CROSS_GRAY = require('../../../assets/images/cross-gray.png');
const PROFILE_PIC = require('../../../assets/images/button-post.png');
const BTN_EMOJI = require('../../../assets/images/button-emoji.png');
const BTN_MAP = require('../../../assets/images/button-map.png');
const BTN_PHOTO = require('../../../assets/images/button-camera.png');
const POST_SAMPLE = require('../../../assets/images/sample-post-image.png');

class CreatePostScreen extends React.Component {
	state = {
		text: ''
	}
	send = () => {

	}
	navigate = () => {
		this.props.navigation.goBack();
	}
	render() {
		return (
			<SafeAreaView style={styles.safeContainer}>

				<StatusBar />

				<View style={styles.head}>

					<View style={SharedStyles.header}>
						<TouchableOpacity onPress={() => this.navigate()} style={[SharedStyles.headLeft, SharedStyles.backButton]}>
							<Image source={CROSS_GRAY} />
						</TouchableOpacity>
						<Text style={[SharedStyles.headTitle, styles.title]}>Create Post</Text>
						<View style={SharedStyles.headRight}>
							<AvatarComponent border={0} size={32} url={PROFILE_PIC}></AvatarComponent>
						</View>
					</View>

				</View>

				<ScrollView>
					<View style={styles.container}>
						<View style={styles.p15}>
							<View style={styles.postImageContainer}>
								<Image source={POST_SAMPLE} />
							</View>
						</View>
						<View style={styles.footerContainer}>
							{/* Input text */}
							<View style={{ minHeight: 56 }}>
								<TextInput
									placeholder="State your green moment here..."
									style={{
										width: '100%',
										paddingHorizontal: 15,
										paddingTop: 15,
										paddingBottom: 10,
										maxHeight: 100
									}}
									numberOfLines={2}
									multiline
									onChangeText={text => this.setState({ text })}
									value={this.state.text}
								/>
							</View>

							{/* Actions */}
							<View style={{ height: 50, paddingHorizontal: 15, paddingVertical: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
								<View style={{ display: 'flex', flexDirection: 'row' }}>
									<View style={{ marginRight: 10 }}>
										<Image source={BTN_EMOJI} />
									</View>
									<View>
										<Image source={BTN_MAP} />
									</View>
								</View>
								<View style={{ paddingRight: 8, height: 28, backgroundColor: Color.LIGHT_GREEN_10, borderRadius: 12, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
									<Image style={{ marginRight: 6 }} source={BTN_PHOTO} />
									<Text style={{ fontSize: 12, color: Color.GRAY_DARK }}>Take a Photo</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>

			</SafeAreaView>
		)
	}
}

export default CreatePostScreen;
