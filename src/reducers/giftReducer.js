import { giftConstants , dialogConstants } from '../constants'


const initValue = {   gifts: [], giftTypes: [], alertMessage: null, totalCount: 0 }

export const giftReducer = (state = initValue, action) => {
    switch (action.type) {
        case giftConstants.COMMIT_GIFT:
            return { ...state, alertMessage: action.message, gifts: action.gifts, totalCount: action.totalCount, giftTypes:action.giftTypes  };
     
        case giftConstants.LOAD_GIFT_LIST:
            return { ...state, gifts: action.gifts, totalCount: action.totalCount, alertMessage: null, giftTypes:action.giftTypes  };

       
        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };

       
      
        default:
            return { ...state };
    }
}