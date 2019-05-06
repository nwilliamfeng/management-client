import { taskConstants, dialogConstants } from '../constants'



const initValue = { currentTask: null, tasks: [], platforms: [], taskTags: [], alertMessage: null, totalCount: 0 }

export const taskReducer = (state = initValue, action) => {
    switch (action.type) {
        case taskConstants.COMMIT_TASK:
            return { ...state, alertMessage: action.message, currentTask: action.task };

        case taskConstants.CREATE_TASK:
            return { ...state, currentTask: action.currentTask, platforms: action.platforms, taskTags: action.taskTags, alertMessage: null };

        case taskConstants.LOAD_TASK_LIST:
            return { ...state, tasks: action.tasks, totalCount: action.totalCount, alertMessage: null, platforms: action.platforms };

        case dialogConstants.SHOW_ERROR_ATTACH:
            return { ...state, alertMessage: action.errorMessage };

        case taskConstants.GET_TASK_TAGS:
            return { ...state, platforms:action.platforms,taskTags:action.taskTags};

        case taskConstants.LOAD_TASK_IN_LOCAL:
            const { tasks } = state;
            return { ...state, currentTask: tasks.find(x => x.taskID === action.taskId), platforms: action.platforms, taskTags: action.taskTags, };

        default:
            return { ...state };
    }
}