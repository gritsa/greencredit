import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';

import {DATE_FORMAT} from '../constants';

/**
 * parse date to string
 * @param date
 * @param format
 */
export const parseDateToString = (date, format) => moment(date).format(format || DATE_FORMAT);

/**
 * parse string to date
 * @param dateString
 */
export const parseStringToDate = (dateString) => moment(dateString).toDate();

/**
 * is network connected
 * check whether internet is connected or not
 */
// eslint-disable-next-line react-hooks/rules-of-hooks
export const isNetworkConnected = () => NetInfo.useNetInfo().isConnected;
