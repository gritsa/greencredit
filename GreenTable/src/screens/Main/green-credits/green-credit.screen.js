//***********************//
// Green Credit Screen
//***********************//
import React from "react";
import { SafeAreaView, StatusBar, View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import TransactionItemComponent from '../../../components/transaction-item/transaction-item.component';
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../../../shared/utils/colors-pack";
import SharedStyles from "../../../shared/shared-styles";
import styles from './style';
import { FontWeight } from "../../../shared/utils/typography-pack";
import { ROUTES } from '../../../shared/constants/routes';

const CREDIT_ICON_INCOME = require('../../../assets/images/credit-count-icon.png');
const PROFILE_PIC = require('../../../assets/images/avatar-1.png');
const CREDIT_MASK = require('../../../assets/images/credit-mask.png');
const LINER_GRADIENT = require('../../../assets/images/liner-gradient.png');

class GreenCreditScreen extends React.Component {

	constructor(props){		
		super(props);			
	}
	
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
	}];
	 
	navigate(){		
		this.props.navigation.navigate(ROUTES.REDEEM);
	}
	render() {
		return (
			<SafeAreaView style={styles.safeContainer}>

				<StatusBar />
				<View style={styles.bg}>

				<ImageBackground source={LINER_GRADIENT} style={{ resizeMode: 'cover', width: '100%', height: 260 }}>
					<View style={styles.head}>

						<ImageBackground style={{ width: '100%', height: 260 }} source={CREDIT_MASK}>
							<View style={SharedStyles.header}>
								<View style={[SharedStyles.headLeft, SharedStyles.backButton]}>															 
									{/* <Image source={ARROW_LEFT_WHITE} />									 */}
								</View>
								<Text style={[SharedStyles.headTitle, styles.title]}>Green Credit</Text>
								<View style={SharedStyles.headRight}>
									<AvatarComponent border={2} size={32} url={PROFILE_PIC}></AvatarComponent>
								</View>
							</View>

							<View style={styles.creditInfoSec}>
								<View style={styles.amount}>
									<Image style={styles.amountImage} source={CREDIT_ICON_INCOME} />
									<Text style={[SharedStyles.totalCreditText, SharedStyles.textWhite]}>3225</Text>
								</View>

								<Text style={[SharedStyles.textWhite_50, SharedStyles.fontSemiBold]}>CREDIT EARNED</Text>

								<TouchableOpacity style={[SharedStyles.buttonPrimary, SharedStyles.shadow, {marginTop: 25}]} 
								onPress={() => this.navigate()}>
									<Text style={[SharedStyles.textWhite, SharedStyles.fontSemiBold]}>REDEEM CREDITS</Text>
								</TouchableOpacity>
							</View>
						</ImageBackground>

					</View>
				</ImageBackground>


				<View style={styles.transactionContainer}>

					<View style={{ backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
						<View style={styles.transactionTitle}>
							<Text style={{ color: Color.PRIMARY_COLOR, fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD }}>TRANSACATION</Text>
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
			
			</SafeAreaView>
		)
	}
}

export default GreenCreditScreen;
