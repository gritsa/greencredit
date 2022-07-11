//***********************//
// Create Post Screen
//***********************//
import React, { useEffect, useState } from "react";
import { TouchableOpacity, KeyboardAvoidingView, SafeAreaView, StatusBar, View, Text, Image, TextInput, Alert } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import { ScrollView } from "react-native-gesture-handler";
import SharedStyles from "../../../shared/shared-styles";
import styles from './style';
import { Color } from "../../../shared/utils/colors-pack";
import { RNCamera } from 'react-native-camera';
import { ROUTES } from '../../../shared/constants/routes';
import { useSelector } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import Loader from "../../../components/loader/loader";
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const CROSS_GRAY = require('../../../assets/images/cross-gray.png');
const PROFILE_PIC = require('../../../assets/images/button-post.png');
const BTN_EMOJI = require('../../../assets/images/button-emoji.png');
const BTN_MAP = require('../../../assets/images/button-map.png');
const BTN_PHOTO = require('../../../assets/images/button-camera.png');
const POST_SAMPLE = require('../../../assets/images/sample-post-image.png');

function CreatePostScreen(props) {
	const imageUrl = props.route.params ?  props.route.params.data : null;
	//console.log(imageUrl);
	const user = useSelector((state) => state.user);
	const [text, setText] = useState('');
	const [loader, setLoader] = useState(false)

	navigate = () => {
		props.navigation.goBack();
	}
	const takephotofromCamera=()=>{
		ImagePicker.openCamera({
			width: 300,
			height: 400,
			cropping: true,
		  }).then(image => {
			
		  });
	}
	const takephotofromGallery=()=>{
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true
		  }).then(image => {
			console.log(image.data);
			

		  });
	}
	
	const renderInner = () => (
		<View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={takephotofromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={takephotofromGallery}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
	  );
	
	 const renderHeader = () => (
		<View style={styles.header}>
		  <View style={styles.panelHeader}>
			<View style={styles.panelHandle} />
		  </View>
		</View>
	  );
	 
	const bs = React.createRef();
	const fall = new Animated.Value(1);

	async function newPost() {
		if (text.length > 0) {
			setLoader(true)
			const data = {
				"geo_location": {},
				"timestamp": moment().format(),
				"tags": "[]",
				"md5hash": text,
				"post_text": text,
				"photos_urls": "[]",
				"user_id": user.user.id,
				"comments": [],
				"likes": []
			}
			await axios.post(`http://54.148.23.236:805/api/create/activities/`, data)
				.then(res => {
					setLoader(false)
					props.navigation.navigate(ROUTES.HOME)
				})
				.catch(err => {
					setLoader(false)
					Alert.alert('Some error occured');
					console.log(err);
				}
				);
		} else {
			Alert.alert('Please enter text!');
		}
	}

	return (
		<SafeAreaView style={styles.safeContainer}>
			<BottomSheet
					ref={bs}
					snapPoints={[330, 0]}
					renderContent={renderInner}
					renderHeader={renderHeader}
					initialSnap={1}
					callbackNode={fall}
					enabledGestureInteraction={true}
				/>
			{loader && (
				<Loader />
			)}
			<StatusBar />
			<View style={styles.head}>
				<View style={SharedStyles.header}>
					<TouchableOpacity onPress={() => this.navigate()} style={[SharedStyles.headLeft, SharedStyles.backButton]}>
						<Image source={CROSS_GRAY} />
					</TouchableOpacity>
					<Text style={[SharedStyles.headTitle, styles.title]}>Create Post</Text>
					<View style={SharedStyles.headRight}>
						<TouchableOpacity onPress={newPost}>
							<AvatarComponent border={0} size={32} url={PROFILE_PIC}></AvatarComponent>
						</TouchableOpacity>
					</View>
				</View>

			</View>
			{/* <KeyboardAvoidingView
					behavior="position" enabled style={styles.wrap} > */}
			<ScrollView>
				<View style={styles.container}>
					<View style={styles.p15}>
						<View style={styles.postImageContainer}>
							{imageUrl ? (
								<Image style={{ width: 330, height: 200, borderRadius: 5 }} source={{ uri: `data:image/jpeg;base64,${imageUrl}`  }} />
							) : (
								<Image style={{ width: 330, borderRadius: 5 }} source={POST_SAMPLE} />
							)}
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
								onChangeText={text => setText(text)}
								value={text}
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
								<TouchableOpacity onPress={() => bs.current.snapTo(0)}>

									<Image style={{ marginRight: 6 }} source={BTN_PHOTO} /></TouchableOpacity>
								<Text style={{ fontSize: 12, color: Color.GRAY_DARK }}>Take a Photo</Text>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
			{/* </KeyboardAvoidingView> */}

		</SafeAreaView>
	)
}
takePicture = async function (camera) {
	const options = { quality: 0.5, base64: true };
	const data = await camera.takePictureAsync(options);
};


export default CreatePostScreen;
