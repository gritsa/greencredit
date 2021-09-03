//***********************//
// Green Credit Screen
//***********************//
import React from "react";
import { View, Text, Image } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import TransactionItemComponent from '../../../components/transaction-item/transaction-item.component';
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../../../shared/utils/colors-pack";
import sharedStyles from "../../../shared/shared-styles";
import styles from './style';

const PROFILE_PIC = require('../../../assets/images/avatar-1.png');

class GreenCreditScreen extends React.Component{ 
	transactions = [{
		description: 'Earned for "For happiness on earth',
		created_at: '12 June 2021',
		is_credit : true,
		amount : 30
	},{
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit : false,
		amount : 100
	},{
		description: 'Earned for "For happiness on earth',
		created_at: '12 June 2021',
		is_credit : true,
		amount : 30
	},{
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit : false,
		amount : 100
	}]
	render(){
		return (
			<View style={styles.bg}>
                <View style={sharedStyles.header}>
					<View style={sharedStyles.headLeft}></View>
					<Text style={sharedStyles.headTitle, styles.title}>Green Credit</Text>
					<View style={sharedStyles.headRight}>
						<AvatarComponent border={2} size={32} url={PROFILE_PIC}></AvatarComponent>
					</View>
				</View>

				<View>
 
					<View style={{backgroundColor: Color.BODY_BG}}>
						<View style={sharedStyles.activityPostContainer}>
							<ScrollView>
							{
								this.transactions.map((item, index) => {
								return <TransactionItemComponent></TransactionItemComponent>
								})
							}  
							</ScrollView>
						</View>
					</View>
					
				</View>
				
            </View>
		)
	}
}

export default GreenCreditScreen;
