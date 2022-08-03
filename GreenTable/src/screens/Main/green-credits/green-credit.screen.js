//***********************//
// Green Credit Screen
//***********************//
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import AvatarComponent from '../../../components/avatar/avatar.component';
import TransactionItemComponent from '../../../components/transaction-item/transaction-item.component';
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../../../shared/utils/colors-pack";
import SharedStyles from "../../../shared/shared-styles";
import styles from './style';
import { FontWeight } from "../../../shared/utils/typography-pack";
import { ROUTES } from '../../../shared/constants/routes';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

const CREDIT_ICON_INCOME = require('../../../assets/images/credit-count-icon.png');
const PROFILE_PIC = require('../../../assets/images/avatar-1.png');
const CREDIT_MASK = require('../../../assets/images/credit-mask.png');
const LINER_GRADIENT = require('../../../assets/images/liner-gradient.png');

function GreenCreditScreen({ props }) {
	const user = useSelector((state) => state.user);
	const [creditPoints, setCreditPoints] = useState([]);
	useEffect(() => {
		// const unsubscribe = props.navigation.addListener('focus', () => {
		getPosts();
		// });
		// return unsubscribe;
	}, []);
	const getPosts = async () => {
		await axios.get(`http://54.148.23.236:805/api/creditledgers-by-user-id/${user.user.id}`)
			.then(res => {
				setCreditPoints(res.data);
				console.log(data);
			})
			.catch(err => {
				console.log(err);
				console.log('false to get posts');
			}
			);
	}

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
									<Image
										style={{ width: 32, height: 32, borderRadius: 50 }}
										source={{ uri: user.user.display_picture }}
									/>
								</View>
							</View>

							<View style={styles.creditInfoSec}>
								<View style={styles.amount}>
									<Image style={styles.amountImage} source={CREDIT_ICON_INCOME} />
									<Text style={[SharedStyles.totalCreditText, SharedStyles.textWhite]}>{creditPoints.length > 0 ? creditPoints[0].total_credits : 0}</Text>
								</View>

								<Text style={[SharedStyles.textWhite_50, SharedStyles.fontSemiBold]}>CREDIT EARNED</Text>

								<TouchableOpacity style={[SharedStyles.buttonPrimary, SharedStyles.shadow, { marginTop: 25 }]}
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
									creditPoints && creditPoints.length > 0 && creditPoints.map((item, index) => {
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

export default GreenCreditScreen;
