import { authConstants , dialogConstants } from '../constants'


const initValue = {   loginInfo:null, alertMessage: null ,loginState:authConstants.LOGGED_OUT  }

export const authReducer = (state = initValue, action) => {
    switch (action.type) {
        case authConstants.LOGGING_IN:
            return { ...state, alertMessage: null, loginState:authConstants.LOGGING_IN  };
     
        case authConstants.LOGGED_IN:
            return { ...state,  alertMessage: null, loginInfo:action.loginInfo,loginState:authConstants.LOGGED_IN  };

       
        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };

       
      
        default:
            return { ...state };
    }
}