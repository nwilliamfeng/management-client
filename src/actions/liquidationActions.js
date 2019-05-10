
import { liquidationConstants , dialogConstants } from '../constants'
import { liquidationApi,taskApi } from '../api'
import { buildMessage } from './messageHelper'

export const liquidationActions = {
    getMonthReport,
    getDayReport,
    getErrorClearPointFlow,
}

function getMonthReport({ clearDate,  platformid,pageIndex}) {
    return async dispatch => {
        try {
           
            const result = await liquidationApi.getMonthReport(clearDate,  platformid,pageIndex);
            const platforms =await taskApi.getPlatforms();
            const reportTypes =liquidationApi.getReportTypes();
            dispatch({ type: liquidationConstants.GET_MONTH_REPORT, monthReports: result.data,platforms,reportTypes,totalCount:result.count});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function getDayReport({ clearDate,  platformid,pageIndex}) {
    return async dispatch => {
        try {         
            const result = await liquidationApi.getDayReport(clearDate,  platformid,pageIndex);
            const platforms =await taskApi.getPlatforms();
            const reportTypes =liquidationApi.getReportTypes();
            dispatch({ type: liquidationConstants.GET_DAY_REPORT, dayReports: result.data,platforms,reportTypes,totalCount:result.count});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function getErrorClearPointFlow({ clearDate,  platformid,pageIndex}) {
    return async dispatch => {
        try {         
            const result = await liquidationApi.getErrorClearPointFlow(clearDate,  platformid,pageIndex);
            const platforms =await taskApi.getPlatforms();
            const reportTypes =liquidationApi.getReportTypes();
            const referTypes =liquidationApi.getReferTypes();
            dispatch({ type: liquidationConstants.GET_ERROR_CLEAR_POINT_FLOW, clearPointFlows: result.data,platforms,reportTypes,referTypes ,totalCount:result.count});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}


 
 