import { greenCreditTypes } from "../contants/action-types";
import axios from 'axios';

export const getGreenCreditPoints = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: greenCreditTypes.GREEN_CREDIT_REQUEST });
            // const res = await axios.get(`/user/${userform.userId}`, userform);
            const res = await axios.post(`http://54.148.23.236:805/api/create/activities/`, data);
            if (res.status === 201) {
                const post = res.data;
                console.log(res.data);
                dispatch({
                    type: greenCreditTypes.GREEN_CREDIT_SUCESS,
                    payload: {
                        post,
                        message: "Image Upload Sucess",
                    },
                });
            } else if (res.status === 400) {
                dispatch({
                    type: greenCreditTypes.GREEN_CREDIT_FAILURE,
                    payload: { error: "Something Went Wrong!!!" },
                });
            }
        } catch (e) {
            console.log('Error')
        }
    };
};