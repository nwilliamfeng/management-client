import { customerConstants, dialogConstants } from '../constants'


const initValue = { userPoints: [], alertMessage: null, totalCount: 0, pointReferTypes: [],giftTypes:[] }

export const customerReducer = (state = initValue, action) => {
    switch (action.type) {
        case customerConstants.LOAD_USER_POINT:
            return { ...state, alertMessage: action.message, userPoints: action.userPoints, totalCount: action.totalCount };

        case customerConstants.LOAD_USER_POINT_FLOW_LIST:
            return { ...state, alertMessage: action.message, userPointFlows: action.userPointFlows, totalCount: action.totalCount, pointReferTypes: action.pointReferTypes };

        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };

        case customerConstants.LOAD_USER_GIFT_LIST:
            return { ...state, alertMessage: action.message, userGifts: action.userGifts, totalCount: action.totalCount, userGiftStates: action.userGiftStates ,giftTypes:action.giftTypes};

        default:
            return { ...state };
    }
}
 
 