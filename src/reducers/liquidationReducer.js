import { liquidationConstants, dialogConstants } from '../constants'


const initValue = { monthReports: [], alertMessage: null, dayReports: [] }

export const liquidationReducer = (state = initValue, action) => {
    switch (action.type) {
        case liquidationConstants.GET_MONTH_REPORT:
            return { ...state, alertMessage: action.message, monthReports: action.monthReports, platforms: action.platforms, reportTypes: action.reportTypes, totalCount: action.totalCount };

        case liquidationConstants.GET_DAY_REPORT:
            return { ...state, alertMessage: action.message, dayReports: action.dayReports, platforms: action.platforms, reportTypes: action.reportTypes, totalCount: action.totalCount };

        case liquidationConstants.GET_ERROR_CLEAR_POINT_FLOW:
            return { ...state,referTypes:action.referTypes , alertMessage: action.message, clearPointFlows: action.clearPointFlows, platforms: action.platforms, reportTypes: action.reportTypes, totalCount: action.totalCount };


        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };



        default:
            return { ...state };
    }
}