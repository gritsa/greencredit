//***********************//
// Redeem Credit Screen
//***********************//
import React from "react";
import { Button, View, Text, Image, ImageBackground } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import TransactionItemComponent from '../../../components/transaction-item/transaction-item.component';
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../../../shared/utils/colors-pack";
import SharedStyles from "../../../shared/shared-styles";
import styles from './style';
import { FontWeight } from "../../../shared/utils/typography-pack";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const CREDIT_ICON_INCOME = require('../../../assets/images/credit-count-icon.png');
const PROFILE_PIC = require('../../../assets/images/avatar-1.png');
const CREDIT_MASK = require('../../../assets/images/credit-mask.png');
const LINER_GRADIENT = require('../../../assets/images/liner-gradient.png');
const CLOSE = require('../../../assets/images/cross-gray.png');

class RedeemCreditScreen extends React.Component {
	transactions = [{
		id: 1,
		description: 'Earned for "For happiness on earth, testing loing text',
		created_at: '12 June 2021',
		is_credit: true,
		amount: 9999999999
	}, {
		id: 2,
		description: 'Redeemed "10% on Food',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}, {
		id: 3,
		description: 'Earned for "For happiness on earth',
		created_at: '12 June 2021',
		is_credit: true,
		amount: 30
	}, {
		id: 4,
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}, {
		id: 5,
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}, {
		id: 6,
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}, {
		id: 7,
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}, {
		id: 8,
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}, {
		id: 9,
		description: 'Redeemed on "10% Discount Coupon',
		created_at: '12 June 2021',
		is_credit: false,
		amount: 100
	}]
	render() {
		return (
			<View style={styles.bg}>

				<View style={styles.head}>

					<ImageBackground style={{ width: '100%', height: 260 }} source={CREDIT_MASK}>
						<View style={SharedStyles.header}>
							<View style={[SharedStyles.headLeft, SharedStyles.backButton]}>
								<Image source={CLOSE} />
							</View>
							<Text style={[SharedStyles.headTitle, styles.title]}>Redeem Credit</Text>
							<View style={SharedStyles.headRight}>
								<AvatarComponent border={2} size={32} url={PROFILE_PIC}></AvatarComponent>
							</View>
						</View>

						<View style={styles.creditInfoSec}>
							<View style={styles.amount}>
								<Image style={styles.amountImage} source={CREDIT_ICON_INCOME} />
								<Text style={[SharedStyles.totalCreditText, SharedStyles.textWhite]}>3225</Text>
							</View>

							<Text style={[SharedStyles.textPrimary, SharedStyles.fontSemiBold]}>GREEN CREDIT BALANCE</Text>

						</View>
					</ImageBackground>

				</View>


				<View style={styles.transactionContainer}>

					<View style={{ backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
						<View style={styles.transactionTitle}>
							<Text style={{ color: Color.PRIMARY_COLOR, fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD }}>COUPONS</Text>
						</View>
						<View style={SharedStyles.transactionScrollContainer}>
							<ScrollView>
								{
									this.transactions.map((item, index) => {
										return <TransactionItemComponent key={item.id} item={item}></TransactionItemComponent>
									})
								}
								<View style={{ height: 70 }}></View>
							</ScrollView>
						</View>
					</View>
				</View>

			</View>
		)
	}
}

export default RedeemCreditScreen;
