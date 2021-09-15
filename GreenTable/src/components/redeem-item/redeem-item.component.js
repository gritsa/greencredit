import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import sharedStyles from '../../shared/shared-styles';
import { Color } from '../../shared/utils/colors-pack';
import { FontWeight } from '../../shared/utils/typography-pack';
import { Dimensions } from 'react-native';

const windowHeight = Dimensions.get('window').width;
const bufferWidth = 145; // including left right padding and avatar image
const CREDIT_ICON_INCOME = require('../../assets/images/credit-icon-medium.png');

const RedeemItemComponent = (props) => {
  //ComponentDidMount
  useEffect(() => {

  }, []);

  return (
    <View style={styles.row}>

      <View style={styles.left}>
        <View style={styles.avatarBox}>
          {
            props.item.logo ?
              <Image source={props.item.logo} />
              :
              <View style={styles.emptyBox}>
                <Text style={styles.emptyText}>LOGO</Text>
              </View>
          }
        </View>
        <View style={{ display: 'flex', justifyContent: 'space-between' }}>

          <View>
            <Text numberOfLines={1} style={styles.description}>
              {props.item.title}
            </Text>
            <Text style={{ fontSize: 12, fontWeight: FontWeight.FONT_WEIGHT_THIN }}>{props.item.description}</Text>
          </View>

          <View style={{width: (windowHeight - bufferWidth), marginTop: 16, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.amount}>
              <Image style={styles.amountImage} source={CREDIT_ICON_INCOME} />
              <Text style={[sharedStyles.textPrimary, { fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD, fontSize: 18 }]}>
                {props.item.amount}
              </Text>
            </View>

            <View style={styles.redeemButton}>
              <Text style={styles.textRedeem}>REDEEM</Text>
            </View>
          </View>

        </View>
      </View>



    </View>
  );
};

export default RedeemItemComponent;


const styles = StyleSheet.create({
  row: {
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: Color.TEXT_BLACK,
    fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD
  },
  redeemButton: {
    height: 22,
    width: 74,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Color.PRIMARY_COLOR,
    borderRadius: 11,
    borderStyle: 'solid',
    borderWidth: 1
  },
  textRedeem: {
    fontSize: 11,
    color: Color.PRIMARY_COLOR
  },
  description: {
    maxWidth: windowHeight - (bufferWidth),
    fontSize: 14,
    fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD
  },
  avatarBox: {
    height: 70,
    width: 70,
    backgroundColor: Color.LIGHT_GREEN,
    borderRadius: 5,
    marginRight: 15
  },
  emptyBox: {
    height: 70,
    width: 70,
    backgroundColor: Color.LIGHT_GREEN,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emptyText: {
    color: Color.GRAY
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'    
  },
  amountImage: {    
    marginRight: 5,
    height: 13,
    width: 13
  }
});
