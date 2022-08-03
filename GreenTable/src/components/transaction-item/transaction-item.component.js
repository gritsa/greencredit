import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import sharedStyles from '../../shared/shared-styles';
import { Color } from '../../shared/utils/colors-pack';
import { FontWeight } from '../../shared/utils/typography-pack';
import { Dimensions } from 'react-native';
import moment from 'moment';
import {trimText} from '../../shared/constants/api-urls';

const windowHeight = Dimensions.get('window').width;
const amountWidth = 120;
const bufferWidth = 90; // including left right padding and avatar image

const AVATAR_CREDIT_ADDED = require('../../assets/images/avatar-credit-added.png');
const AVATAR_CREDIT_REDEEMED = require('../../assets/images/avatar-credit-redeemed.png');
const CREDIT_ICON_INCOME = require('../../assets/images/credit-icon-income.png');
const CREDIT_ICON_REDEEMED = require('../../assets/images/credit-icon-redeemed.png');

const TransactionItemComponent = (props) => {
  //ComponentDidMount
  useEffect(() => {

  }, []);

  return (
    <View style={styles.row}>

      <View style={styles.left}>
        <View style={styles.avatar}>
          {
            props.item.is_credit ?
              <Image source={AVATAR_CREDIT_ADDED} />
              :
              <Image source={AVATAR_CREDIT_REDEEMED} />
          }
        </View>
        <View>
          <Text numberOfLines={1} style={styles.description}>
            Earned for "{trimText(props.item.post_text, 25)}"
          </Text>
          <Text style={{ fontSize: 11, fontWeight: FontWeight.FONT_WEIGHT_THIN }}>{moment(props.item.timestamp).startOf('hour').fromNow()}</Text>
        </View>
      </View>

      {
        props.item.is_credit ?
          <View style={styles.amount}>
            <Image style={styles.amountImage} source={CREDIT_ICON_INCOME} />
            <Text style={sharedStyles.textPrimary}>
              {props.item.amount}
            </Text>
          </View>
          :
          <View style={styles.amount}>
            <Image style={styles.amountImage} source={CREDIT_ICON_REDEEMED} />
            <Text style={[sharedStyles.textSecondary, { fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD }]}>
              {props.item.amount}
            </Text>
          </View>
      }

    </View>
  );
};

export default TransactionItemComponent;


const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: Color.TEXT_BLACK,
    fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD
  },
  description: {
    maxWidth: windowHeight - (bufferWidth + amountWidth),
    fontSize: 12,
    fontWeight: FontWeight.FONT_WEIGHT_SEMI_BOLD
  },
  avatar: {
    marginRight: 15
  },
  right: {
    maxWidth: amountWidth,
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  colMid: {
    flexDirection: 'column',
  },
  amount: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5
  },
  amountImage: {
    marginRight: 5,
    marginBottom: -1
  }
});
