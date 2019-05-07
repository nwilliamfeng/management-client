
import { giftConstants , dialogConstants } from '../constants'
import { giftApi } from '../api'
import { buildMessage } from './messageHelper'

export const giftActions = {
    getGifts,
    addOrUpateGift,
}

function getGifts({giftId, startTime, endTime, activeName, giftType, giftState, isEnabled, isDel, pageIndex, pageSize}) {
    return async dispatch => {
        try {
           
            const result = await giftApi.loadGifts(giftId, startTime, endTime, activeName, giftType, giftState, isEnabled, isDel, pageIndex, pageSize);
            const giftTypes=giftApi.getGiftTypes();
            dispatch({ type: giftConstants.LOAD_GIFT_LIST, gifts: result.data, totalCount: result.count ,giftTypes});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

 


function addOrUpateGift(gift, { giftId, startTime, endTime, activeName, giftType, giftState, isEnabled, isDel, pageIndex, pageSize }) {

    return async dispatch => {
        try{
            const result = await giftApi.addOrUpdateTask(gift);  
            const giftsResult = await giftApi.loadGifts(giftId, startTime, endTime, activeName, giftType, giftState, isEnabled, isDel, pageIndex, pageSize);
            const giftTypes=giftApi.getGiftTypes();
            dispatch({ type:giftConstants.COMMIT_GIFT, message: buildMessage(result.message), gifts: giftsResult.data, totalCount: giftsResult.count,giftTypes });
        }
        catch(error){
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
        
    }
}

 