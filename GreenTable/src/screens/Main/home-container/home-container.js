//***********************//
// Home Container Screen
//***********************//
import React from "react";
import { StatusBar, Alert, View, SafeAreaView } from "react-native";
import ActivityScreen from "../activity/activity.screen";
import GreenCreditScreen from "../green-credits/green-credit.screen";
import CustomTabComponent from "../../../components/custom-tab/custom-tab.component";
import { ROUTES } from "../../../shared/constants/routes";
import sharedStyles from "../../../shared/shared-styles";

class HomeContainerScreen extends React.Component {

	state = {
		currentState: ROUTES.ACTIVITY
	}
	handleClick = (data) => {		
		this.setState({ currentState: data })
	}
	render() {
		return (
			<SafeAreaView style={{ display:'flex',flex:1, position: 'relative', backgroundColor:'#fff', height: '100%'}}>
				<StatusBar></StatusBar>
				<View style={sharedStyles.container}>
				{
					this.state.currentState === ROUTES.ACTIVITY ?
						<ActivityScreen></ActivityScreen>
						:
						<GreenCreditScreen></GreenCreditScreen>

				}
				</View>

				<CustomTabComponent clickMe={this.handleClick} ></CustomTabComponent>

			</SafeAreaView>
		)
	}
}

export default HomeContainerScreen;
