import { authConstants, dialogConstants } from '../constants'
import { authApi } from '../api'
import { appContext} from '../helper'
import {history} from '../util'
import { buildMessage } from './messageHelper'

export const authActions = {
    login,
    logout,
}



function login(userId, password) {
    return async dispatch => {
        try {
          
            const result = await authApi.login(userId, password);
            const { statusCode, data, message } = result;
            if (statusCode !== 1) {
                dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage:  buildMessage(message)  });
            }
            else {
                appContext.saveLoginInfo(data);
                dispatch({ type: authConstants.LOGIN, info: data });
                history.push('/');//导航到主页
            }
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage:  buildMessage(error.message) })
        }
    }
}

function logout(userId, accessToken) {
    return async dispatch => {
        try {
          
            const result = await authApi.logout(userId, accessToken);
            const { statusCode, data, message } = result;
            if (statusCode !== 1) {
                dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage:  buildMessage(message)  });
            }
            else {
                appContext.clearLoginInfo();
                dispatch({ type: authConstants.LOGOUT, info: data });
                history.push('/');//导航到主页
            }
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage:  buildMessage(error.message) })
        }
    }
}



