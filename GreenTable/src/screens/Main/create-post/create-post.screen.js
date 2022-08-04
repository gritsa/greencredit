//***********************//
// Create Post Screen
//***********************//
import React, { useEffect, useState } from "react";
import { TouchableOpacity, Platform, SafeAreaView, StatusBar, View, Text, Image, TextInput, Alert } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import { ScrollView } from "react-native-gesture-handler";
import SharedStyles from "../../../shared/shared-styles";
import styles from './style';
import { Color } from "../../../shared/utils/colors-pack";
import { RNCamera } from 'react-native-camera';
import { ROUTES } from '../../../shared/constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import Loader from "../../../components/loader/loader";
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import { post_image } from '../../../core/Redux/actions/PostActions'

const CROSS_GRAY = require('../../../assets/images/cross-gray.png');
const PROFILE_PIC = require('../../../assets/images/button-post.png');
const BTN_EMOJI = require('../../../assets/images/button-emoji.png');
const BTN_MAP = require('../../../assets/images/button-map.png');
const BTN_PHOTO = require('../../../assets/images/button-camera.png');
const POST_SAMPLE = require('../../../assets/images/sample-post-image.png');

function CreatePostScreen(props) {
	var base64 = [];
	//console.log(imageUrl);
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [text, setText] = useState('');
	const [loader, setLoader] = useState(false)
	const [imageUrl, setImage] = useState([]);

	const navigate = () => {
		props.navigation.goBack();
	}
	const takephotofromCamera = () => {
		ImagePicker.openCamera({
			width: 300,
			height: 400,
			cropping: true,
			includeBase64: true,
		}).then(image => {
			console.log(image.data)
			if (image.data) {
				base64.push(image.data);
				if (imageUrl.length === 0) {
					setImage(base64);
				} else {
					setImage([...imageUrl, ...base64]);
				}
			}
		});
	}
	const takephotofromGallery = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 400,
			cropping: true,
			includeBase64: true,
		}).then(image => {
			if (image.data) {
				base64.push(image.data);
				if (imageUrl.length === 0) {
					setImage(base64);
				} else {
					setImage([...imageUrl, ...base64]);
				}
			}
		});
	}

	const renderInner = () => (
		<View style={styles.panel}>
			<View style={{ alignItems: 'center' }}>
				<Text style={styles.panelTitle}>Upload Photo</Text>
				<Text style={styles.panelSubtitle}>Choose Your  Picture</Text>
			</View>
			<TouchableOpacity style={styles.panelButton} onPress={takephotofromCamera}>
				<Text style={styles.panelButtonTitle}>Take Photo</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.panelButton} onPress={takephotofromGallery}>
				<Text style={styles.panelButtonTitle}>Choose From Gallery</Text>
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

	async function newPost(photoUrls) {
			setLoader(true)
			const data = {
				"geo_location": {},
				"timestamp": moment().format(),
				"tags": "[]",
				"md5hash": text,
				"post_text": text,
				"photo_urls": photoUrls,
				"user": user.user.id,
				"comments": [],
				"likes": []
			}
			//await axios.post(`http://54.148.23.236:805/api/create/activities/`, data)
			//console.log(res.data)

			dispatch(post_image(data))
				.then((res) => {
					props.navigation.navigate(ROUTES.HOME)
					setLoader(false)
					console.log('testing')
				})
				.catch((error) => {
					setLoader(false)
					console.log(err);
				});


			// .then(res => {
			// 	setLoader(false)
			// 	props.navigation.navigate(ROUTES.HOME)
			// 	console.log('testing')
			// })
			// .catch(err => {
			// 	setLoader(false)
			// 	Alert.alert('Some error occured');
			// 	console.log(err);
			// }
			// );
	}

	function postImage() {
		if (imageUrl.length > 0) {
			setLoader(true)
			const photoUrls = [];
			const imageBase64 = imageUrl;
			imageUrl.forEach((element, index) => {
				var bodyFormData = new FormData();
				bodyFormData.append('photo', element.toString());
				axios({ method: 'post', url: `http://54.148.23.236:805/api/uploadimage/`, data: bodyFormData, headers: { 'Content-Type': 'multipart/form-data' }, })
					.then(res => {
						if (res.data) {
							photoUrls.push(res.data);
							imageBase64.pop();
							if (imageBase64.length === 0) {
								newPost(photoUrls)
							}
						}
						console.log(res)
					})
					.catch(err => {
						Alert.alert('Some error occured');
						console.log(err);
					}
					);
			});
		} else if (text.length > 0) {
			newPost([])
		} else {
			Alert.alert('Please enter text or upload image!');
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
					<TouchableOpacity onPress={() => navigate()} style={[SharedStyles.headLeft, SharedStyles.backButton]}>
						<Image source={CROSS_GRAY} />
					</TouchableOpacity>
					<Text style={[SharedStyles.headTitle, styles.title]}>Create Post</Text>
					<View style={SharedStyles.headRight}>
						<TouchableOpacity onPress={postImage}>
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
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}>
								{imageUrl && imageUrl.length > 0 && imageUrl.map((item, index) => {
									return <Image key={index} style={{ width: 310, height: 200, borderRadius: 5, marginRight: 10 }} source={{ uri: `data:image/jpeg;base64,${item}` }} />;
								})}

							</ScrollView>

						</View>
					</View>

					<View >
						{/* Input text */}
						<View style={{ minHeight: 56, marginTop: Platform.OS === 'ios' ? -200 : 0 }}>
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
