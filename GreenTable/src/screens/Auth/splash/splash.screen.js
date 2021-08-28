//***********************//
// Splash Screen
//***********************//
import React from "react";
import { Animated, View, ImageBackground } from "react-native";
import styles from './style';
import { Image } from 'react-native-ui-lib';
import { ROUTES } from '../../../shared/constants/routes';

// images from assets
const BG = require('../../../assets/images/green-mask.png');
const icon = require('../../../assets/images/logo.png');
const logoName = require('../../../assets/images/logo-name.png');

class SplashScreen extends React.Component {

	state = {
		animate: new Animated.Value(0) // initial scale is 0
	}
	
	componentDidMount = () => {
		this.animateIt();		
	}

	slideToGetStarted = () =>  {
		setTimeout(()=> {
			this.props.navigation.navigate(ROUTES.INTRO);
		}, 1000)
	}

	animateIt = () =>  {
		Animated.timing(this.state.animate, {
			toValue: 1,
			duration: 1500,
			useNativeDriver: true
		}).start(()=>{
			this.slideToGetStarted();
		});
	} 

	render() {
		return (
			<View style={styles.container}>
				<ImageBackground style={styles.image} source={BG}></ImageBackground>

				<View style={styles.content}>

					<Animated.Image style={[styles.icon, {
						transform: [{
							scale: this.state.animate
						}]
					}]} source={icon} />

					<Image source={logoName} />
				</View>
			</View>
		)
	}
}

export default SplashScreen;
