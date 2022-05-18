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

// images from assets
const ICON = require('../../../assets/images/icon.png');
const SIGNIN_BG = require('../../../assets/images/signin-bg.png');
const GOOGLE_ICON = require('../../../assets/images/google-icon.png');
const APPLE_ICON = require('../../../assets/images/apple-icon.png');

class SigninScreen extends React.Component {

	signInGoogle = () => {
		GoogleSignin.signOut();
		GoogleSignin.configure({
			androidClientId: '209848220646-2tlf540hpq4lpq2tta9dshq5u14nstpd.apps.googleusercontent.com',
		});
		GoogleSignin.hasPlayServices().then((hasPlayService) => {
			if (hasPlayService) {
				GoogleSignin.signIn().then((userInfo) => {
					console.log(JSON.stringify(userInfo))
				}).catch((e) => {
					console.log("ERROR IS: " + JSON.stringify(e));
				})
			}
		}).catch((e) => {
			console.log("ERROR IS: " + JSON.stringify(e));
		})
	}
	signInApple = () => {
		this.props.navigation.navigate(ROUTES.INTRO)
	}

	render() {
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
}

export default SigninScreen;
