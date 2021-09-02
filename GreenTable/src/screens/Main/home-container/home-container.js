//***********************//
// Home Container Screen
//***********************//
import React from "react";
import { StatusBar, Alert, View, SafeAreaView } from "react-native";
import ActivityScreen from "../activity/activity.screen";
import GreenCreditScreen from "../green-credits/green-credit.screen";
import CustomTabComponent from "../../../components/custom-tab/custom-tab.component";
import { ROUTES } from "../../../shared/constants/routes";

class HomeContainerScreen extends React.Component {

	state = {
		currentState: ROUTES.ACTIVITY
	}
	handleClick = (data) => {
		Alert.alert(data);
		this.setState({ currentState: data })
	}
	render() {
		return (
			<SafeAreaView style={{ position: 'relative', height: '100%', backgroundColor: '#fff' }}>

				{
					this.state.currentState === ROUTES.ACTIVITY ?
						<ActivityScreen></ActivityScreen>
						:
						<GreenCreditScreen></GreenCreditScreen>

				}

				<CustomTabComponent clickMe={this.handleClick} ></CustomTabComponent>

			</SafeAreaView>
		)
	}
}

export default HomeContainerScreen;
