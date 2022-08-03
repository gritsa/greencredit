import { greenCreditTypes } from "../contants/action-types";

const initState = {
    creditPoints: ''
};

export default (state = initState, action) => {
    switch (action.type) {
        case greenCreditTypes.GREEN_CREDIT_REQUEST:
            state = {
                ...state,
            };
            break;
        case greenCreditTypes.GREEN_CREDIT_SUCESS:
            state = {
                creditPoints: action.payload.creditPoints,
                message: action.payload.message,
            };
            break;
        case greenCreditTypes.GREEN_CREDIT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
            };
            break;
        default:
    }
    return state;
};
