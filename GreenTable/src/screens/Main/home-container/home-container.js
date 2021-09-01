//***********************//
// Home Container Screen
//***********************//
import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import ActivityScreen from "../activity/activity.screen";
import CustomTabComponent from "../../../components/custom-tab/custom-tab.component";
import { ScrollView } from "react-native-gesture-handler";
import { Color } from '../../../shared/utils/colors-pack';

class HomeContainerScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={{ height: '100%', backgroundColor: '#fff' }}>

				{/* Will change on tab click */}
				<ActivityScreen></ActivityScreen>

				<CustomTabComponent></CustomTabComponent>
			</SafeAreaView>
		)
	}
}

export default HomeContainerScreen;
