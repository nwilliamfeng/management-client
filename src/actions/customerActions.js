
import { customerConstants , dialogConstants } from '../constants'
import { customerApi,giftApi } from '../api'
import { buildMessage } from './messageHelper'

export const customerActions = {
    getUserPoints: getUserPoints,
    getUserPointFlowsFromDayReport: getUserPointFlowsFromDayReport,
    getUserGiftList:getUserGiftList,
}

function getUserPoints({userId, pageIndex, pageSize}) {
    return async dispatch => {
        try {         
            const result = await customerApi.getCustomerPoints(userId, pageIndex, pageSize);  
            dispatch({ type: customerConstants.LOAD_USER_POINT, userPoints: result.data, totalCount: result.count });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function getUserPointFlowsFromDayReport({startTime,endTime, userId, pageIndex, pageSize}) {
    return async dispatch => {
        try {          
         
            const result = await customerApi.getCustomerPointFlowsFromDayReport(userId,startTime,endTime,  pageIndex, pageSize);
            const pointReferTypes= customerApi.getPointReferTypes();
            dispatch({ type: customerConstants.LOAD_USER_POINT_FLOW_LIST, userPointFlows: result.data, totalCount: result.count ,pointReferTypes});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}
 

function getUserGiftList({userId, usergiftId, giftId, giftType, giftState, pageIndex, pageSize}) {
    return async dispatch => {
        try {          
         
            const result = await customerApi.getCustomerGiftList(userId, usergiftId, giftId, giftType, giftState, pageIndex, pageSize);
            const userGiftStates= customerApi.getUserGiftStates();
            const giftTypes =giftApi.getGiftTypes();
            dispatch({ type: customerConstants.LOAD_USER_GIFT_LIST, userGifts: result.data, totalCount: result.count ,userGiftStates,giftTypes});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}
 

 