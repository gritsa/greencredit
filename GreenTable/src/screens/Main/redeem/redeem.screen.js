//***********************//
// Redeem Credit Screen
//***********************//
import React from "react";
import { TouchableOpacity, SafeAreaView, StatusBar, View, Text, Image, ImageBackground } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import RedeemItemComponent from '../../../components/redeem-item/redeem-item.component';
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
const CROSS_GRAY = require('../../../assets/images/cross-gray.png');

class RedeemCreditScreen extends React.Component {

	transactions = [{
		id: 1,
		title: 'Earned for "For happiness on earth, testing loing text',
		description: 'Lorem Ipsum',
		logo: null,
		amount: 323232323
	}, {
		id: 2,
		title: 'Redeemed "10% on Food',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 45
	}, {
		id: 3,
		title: 'Earned for "For happiness on earth',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 333
	}, {
		id: 4,
		title: 'Redeemed on "10% Discount Coupon',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		logo: null,
		amount: 33
	}, {
		id: 5,
		title: 'Redeemed on "10% Discount Coupon',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 333
	}, {
		id: 6,
		title: 'Redeemed on "10% Discount Coupon',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 333
	}, {
		id: 7,
		title: 'Redeemed on "10% Discount Coupon',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 333
	}, {
		id: 8,
		title: 'Redeemed on "10% Discount Coupon',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 333
	}, {
		id: 9,
		title: 'Redeemed on "10% Discount Coupon',
		description: 'Lorem Ipsum',
		logo: require('../../../assets/images/zara.png'),
		amount: 333
	}]

	navigate = () => {
		this.props.navigation.goBack();
	}

	render() {
		return (
			<SafeAreaView style={styles.safeContainer}>

				<StatusBar />

				<View style={styles.bg}>

					<View style={styles.head}>

						<ImageBackground style={{
							borderBottomLeftRadius: 15,
							borderBottomRightRadius: 15,
							width: '100%', height: 220
						}} source={CREDIT_MASK}>
							<View style={{
								height: '100%',
								borderBottomLeftRadius: 15,
								borderBottomRightRadius: 15,
								backgroundColor: Color.WHITE_90
							}}>
								<View style={SharedStyles.header}>
									<TouchableOpacity onPress={() => this.navigate()} style={[SharedStyles.headLeft, SharedStyles.backButton]}>
										<Image source={CROSS_GRAY} />
									</TouchableOpacity>
									<Text style={[SharedStyles.headTitle, styles.title]}>Redeem</Text>
									<View style={SharedStyles.headRight}>
										<AvatarComponent border={2} size={32} url={PROFILE_PIC}></AvatarComponent>
									</View>
								</View>

								<View style={styles.creditInfoSec}>
									<View style={styles.amount}>
										<Image style={styles.amountImage} source={CREDIT_ICON_INCOME} />
										<Text style={[SharedStyles.totalCreditText, SharedStyles.textSecondary]}>3225</Text>
									</View>

									<Text style={[SharedStyles.textPrimary, SharedStyles.fontSemiBold]}>GREEN CREDIT BALANCE</Text>

								</View>
							</View>
						</ImageBackground>

					</View>


					<View style={styles.transactionContainer}>
						<View>
							<View style={styles.transactionTitle}>
								<Text style={{ color: Color.PRIMARY_COLOR, fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD }}>COUPONS</Text>
							</View>
							<View style={SharedStyles.couponListScrollContainer}>
								<ScrollView>
									{
										this.transactions.map((item, index) => {
											return <RedeemItemComponent key={item.id} item={item}></RedeemItemComponent>
										})
									}									
								</ScrollView>
							</View>
						</View>
					</View>

				</View>
			
			</SafeAreaView>
		)
	}
}

export default RedeemCreditScreen;
