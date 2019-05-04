import { taskConstants, dialogConstants } from '../constants'



const initValue = { currentTask: null, tasks: [], platforms: [], taskTags: [], alertMessage: null,totalCount:0 }

export const taskReducer = (state = initValue, action) => {
    switch (action.type) {
        case taskConstants.CREATE_TASK:
            return { ...state, currentTask: action.currentTask, platforms: action.platforms, taskTags: action.taskTags, alertMessage: null };
        case taskConstants.LOAD_TASK_LIST:
            return { ...state, tasks:action.tasks,totalCount:action.totalCount, alertMessage: null };
        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };
        default:
            return { ...state };
    }
}