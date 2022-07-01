//***********************//
// Signin Screen
//***********************//
import React from "react";
import { View, Text, Image, ImageBackground } from "react-native";
import styles from './style';
import SharedStyle from '../../../shared/shared-styles';
import { ROUTES } from '../../../shared/constants/routes';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../../../core/Redux/actions/UserActions';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// images from assets
const ICON = require('../../../assets/images/icon.png');
const SIGNIN_BG = require('../../../assets/images/signin-bg.png');
const GOOGLE_ICON = require('../../../assets/images/google-icon.png');
const APPLE_ICON = require('../../../assets/images/apple-icon.png');

function SigninScreen(props) {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	signInGoogle = () => {
		// let data = {
		// 	"email": 'payalseth33@gmail.com',
		// 	"first_name": 'payal',
		// 	"last_name": 'seth',
		// 	"title": 'seth',
		// 	"created_at": "2022-06-30T12:52:24.127Z",
		// 	"updated_at": "2022-06-30T12:52:24.127Z",
		// 	"display_picture": 'hhh',
		// 	"is_verified": true,
		// 	"is_deleted": false,
		// 	"role": "Activist",
		// 	"username": 'sdjs',
		// 	"auth_provider": 'dshbh'
		// }
		// signupUser(data);
		GoogleSignin.signOut();
		GoogleSignin.configure({
			androidClientId: '209848220646-2tlf540hpq4lpq2tta9dshq5u14nstpd.apps.googleusercontent.com',
		});
		GoogleSignin.hasPlayServices().then((hasPlayService) => {
			if (hasPlayService) {
				GoogleSignin.signIn().then((userInfo) => {
					let data = {
						"email": userInfo.user.email.trim().toLowerCase(),
						"first_name": userInfo.user.givenName,
						"last_name": userInfo.user.familyName,
						"title": userInfo.user.givenName,
						"created_at": "2022-06-30T12:52:24.127Z",
						"updated_at": "2022-06-30T12:52:24.127Z",
						"display_picture": userInfo.user.photo,
						"is_verified": true,
						"is_deleted": false,
						"role": "Activist",
						"username": userInfo.user.givenName,
						"auth_provider": userInfo.user.id
					}
					signupUser(data);

				}).catch((e) => {
					console.log("ERROR IS: " + JSON.stringify(e));
				})
			}
		}).catch((e) => {
			console.log("ERROR IS: " + JSON.stringify(e));
		})
	}

	signupUser = (data) => {
		dispatch(signup(data))
			.then((res) => {
				props.navigation.navigate(ROUTES.HOME)
				console.log(res + 'test')
			})
			.catch((error) => {
				console.log(error + 'test3')
			});
	}

	async function gettingLocal() {
		const token = await AsyncStorage.getItem("token");
		const user = await AsyncStorage.getItem("user");

		return { token, user };
	}

	signInApple = () => {
		// this.props.navigation.navigate(ROUTES.INTRO)
		console.log(gettingLocal(), user);
	}


	return (
		<View style={styles.container}>

			<View style={styles.left}></View>

			<View style={styles.right}>
				<ImageBackground style={styles.bgImage} source={SIGNIN_BG}></ImageBackground>
			</View>

			<View style={styles.contents}>
				<View style={styles.sliderContainer}>
					<Image style={styles.introImage} source={ICON} />
					<Text style={styles.introTitle}></Text>
					<Text style={styles.introDescription1}>Clean &amp; Green is our Perfect Dream...</Text>
					<Text style={styles.introDescription2}>while you can, encourage others to join and get rewarded for the good you do!</Text>
					<View style={styles.EmptyView}></View>
					<View></View>
				</View>

				<View>
					<View style={[SharedStyle.shadow, SharedStyle.button, styles.buttonGoogle]} onTouchEnd={this.signInGoogle}>
						<Image style={styles.buttonIcon} source={GOOGLE_ICON} />
						<Text>Sign in with Google</Text>
					</View>

					<View style={[SharedStyle.shadow, SharedStyle.button, styles.buttonApple]} onTouchEnd={this.signInApple}>
						<Image style={styles.buttonIcon} source={APPLE_ICON} />
						<Text style={styles.text}>Sign in with Apple</Text>
					</View>
				</View>
			</View>

		</View>
	)
}

export default SigninScreen;
