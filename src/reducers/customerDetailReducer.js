import { customerConstants, dialogConstants } from '../constants'

const initData = {
    message: null,
    count: 0,
    data: [],
}



const initValue = { pointFlowDetail: { ...initData }, giftDetail: { ...initData }, }

export const customerDetailReducer = (state = initValue, action) => {
    switch (action.type) {
        case customerConstants.LOAD_USER_POINT_FLOWS_BY_USER_ID:
        return { ...state, pointFlowDetail: action.data,pointReferTypes:action.pointReferTypes, };

        case customerConstants.LOAD_USER_GIFTS_BY_USER_ID:
            return { ...state, giftDetail: action.data,giftTypes:action.giftTypes,giftStates:action.giftStates };

        default:
            return { ...state };
    }
}