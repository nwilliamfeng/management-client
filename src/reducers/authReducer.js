import { authConstants ,loginStates, dialogConstants } from '../constants'


const initValue = {   loginInfo:null, alertMessage: null ,loginState:loginStates.LOGGED_OUT  }

export const authReducer = (state = initValue, action) => {
    switch (action.type) {
        
     
        case authConstants.LOGIN:
            return { ...state,  alertMessage: null, loginInfo:action.loginInfo,loginState:loginStates.LOGGED_IN  };

       
        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };

       
      
        default:
            return { ...state };
    }
}