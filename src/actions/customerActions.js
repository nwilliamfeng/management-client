
import { customerConstants , dialogConstants } from '../constants'
import { customerApi,giftApi } from '../api'
import { buildMessage } from './messageHelper'

export const customerActions = {
    getUserPoints,
    getUserPointFlowsFromDayReport,
    getUserGiftList,
    getUserGiftListByUserId,
    getUserPointFlowListByUserId,
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

function getUserGiftListByUserId({userId,pageIndex,pageSize}){
    return async dispatch => {
        try {          
         
            const result = await customerApi.getCustomerGiftListByUserId(userId,  pageIndex, pageSize);
            const giftStates= customerApi.getUserGiftStates();
            const giftTypes =giftApi.getGiftTypes();
            dispatch({ type: customerConstants.LOAD_USER_GIFTS_BY_USER_ID, data: result ,giftStates,giftTypes});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}
 

function getUserPointFlowListByUserId({userId,pageIndex,pageSize}){
    return async dispatch => {
        try {          
         
            const result = await customerApi.getCustomerPointFlowListByUserId(userId,  pageIndex, pageSize);
            const pointReferTypes= customerApi.getPointReferTypes();
            dispatch({ type: customerConstants.LOAD_USER_POINT_FLOWS_BY_USER_ID, data: result ,pointReferTypes});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

 