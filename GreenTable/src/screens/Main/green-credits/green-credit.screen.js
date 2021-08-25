//***********************//
// Green Credit Screen
//***********************//
import React from "react";
import { View } from "react-native";
import TransactionItemComponent from '../../../components/transaction-item/transaction-item.component';

class GreenCreditScreen extends React.Component{ 
	render(){
		return (
			<View>
                <TransactionItemComponent></TransactionItemComponent>
            </View>
		)
	}
}

export default GreenCreditScreen;
