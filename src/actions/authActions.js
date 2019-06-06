import { authConstants, dialogConstants } from '../constants'
import { authApi } from '../api'
import { buildMessage } from './messageHelper'

export const authActions = {
    login,

}



function login(userId, password) {
    return async dispatch => {
        try {
            dispatch({ type: authConstants.LOGGING_IN });
            const result = await authApi.login(userId, password);
            const { statusCode, data, message } = result;
            if (statusCode !== 1) {
                dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(message) });
            }
            else {
                dispatch({ type: authConstants.LOGGED_IN, info: data });
            }
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}



