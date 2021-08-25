//***********************//
// Splash Screen
//***********************//
import React from "react";
import { View, Text } from "react-native";
import styles from './style';

class SplashScreen extends React.Component{ 
	render(){
		return (
			<View style={styles.container}>
                <Text>Green Table</Text>
            </View>
		)
	}
}

export default SplashScreen;
