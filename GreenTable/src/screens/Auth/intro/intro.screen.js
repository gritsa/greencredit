//***********************//
// Intro Screen
//***********************//
import React from "react";
import { View, Text } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import { Image } from 'react-native-ui-lib';
import styles from './style';
import SharedStyle from '../../../shared/shared-styles';
import { ROUTES } from '../../../shared/constants/routes';

// images from assets
const INTRO1 = require('../../../assets/images/get-started-1.png');

class IntroScreen extends React.Component {

	slides = [
		{
			key: 's1',
			title: 'Step 1',
			description1: 'Lorem Ipsum is simply dummy text of the printing graphics.',
			description2: 'Lorem Ipsum is simply dummy text of the printing graphics.',
			image: INTRO1
		},
		{
			key: 's2',
			title: 'Step 2',
			description1: 'Lorem Ipsum is simply dummy text of the printing graphics.',
			description2: 'Lorem Ipsum is simply dummy text of the printing graphics.',
			image: INTRO1
		},
		{
			key: 's3',
			title: 'Step 3',
			description1: 'Lorem Ipsum is simply dummy text of the printing graphics.',
			description2: 'Lorem Ipsum is simply dummy text of the printing graphics.',
			image: INTRO1
		}
	];

	renderItem = ({ item }) => {
		return (
			<View style={styles.sliderContainer}>
				<Image style={styles.introImage} source={item.image} />
				<Text style={styles.introTitle}>{item.title}</Text>
				<Text style={styles.introDescription1}>{item.description1}</Text>
				<Text style={styles.introDescription2}>{item.description2}</Text>
				<View style={styles.EmptyView}></View>
				<View></View>
			</View>
		);
	}
	onDone = () => {
		// navigate to signin screen
		this.props.navigation.navigate(ROUTES.SIGNIN)
	}

	render = () => {
		return (
			<View style={styles.container}>

				<View style={styles.left}></View>
				<View style={styles.right}></View>

				<View style={styles.contents}>
					<AppIntroSlider
						data={this.slides}
						renderItem={this.renderItem}
						showSkipButton={false}
						showNextButton={false}
						showDoneButton={false}
						dotStyle={styles.dotStyle}
						activeDotStyle={styles.activeDotStyle}
					/>

					<View style={[SharedStyle.shadow, SharedStyle.button, styles.button]} onTouchEnd={this.onDone}>
						<Text style={styles.text}>GET STARTED</Text>
					</View>
				</View>

			</View>
		)
	}
}

export default IntroScreen;
