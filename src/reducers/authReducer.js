import { authConstants , dialogConstants } from '../constants'
import {appContext} from '../helper'

const initValue = {   loginInfo:appContext.getLoginInfo(), alertMessage: null   }

export const authReducer = (state = initValue, action) => {
    switch (action.type) {
        
     
        case authConstants.LOGIN:
            return { ...state,  alertMessage: null, loginInfo:action.loginInfo };

       
        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };

       
      
        default:
            return { ...state };
    }
}