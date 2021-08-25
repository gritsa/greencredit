//***********************//
// Splash Screen
//***********************//
import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styles from './style';
import { Image } from 'react-native-ui-lib';

class SplashScreen extends React.Component {

	render() {
		return (
			<View style={styles.container}>

				<ImageBackground style={styles.image} source={require('../../../assets/images/green-mask.png')}
				></ImageBackground>

				<View style={styles.content}>
					<Image style={styles.icon} source={require('../../../assets/images/logo.png')} />
					<Text style={styles.text}>Green Table</Text>
				</View>
			</View>
		)
	}
}

export default SplashScreen;
