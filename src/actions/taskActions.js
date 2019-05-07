
import { taskConstants, dialogConstants } from '../constants'
import { taskApi } from '../api'
import { buildMessage } from './messageHelper'

export const taskActions = {
    getTasks,

    addOrUpateTask,
    // getTaskInLocal,
    getTaskTags,
    addOrUpateTaskTag,
}

function getTasks(platformId, startTime, endTime, pageIndex = 1, pageSize = 10) {
    return async dispatch => {
        try {
            const platforms = await taskApi.getPlatforms();
            const taskTags = await taskApi.getTaskTags();
            const result = await taskApi.loadTasks(platformId, startTime, endTime, pageIndex, pageSize);
            dispatch({ type: taskConstants.LOAD_TASK_LIST, tasks: result.data, totalCount: result.count, platforms, taskTags });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function getTaskTags() {
    return async dispatch => {
        try {
            const platforms = await taskApi.getPlatforms();
            const taskTags = await taskApi.getTaskTags();
            dispatch({ type: taskConstants.GET_TASK_TAGS, taskTags, platforms });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}



// function getTaskInLocal(taskId) {
//     return async dispatch => {
//         try {
//             const platforms = await taskApi.getPlatforms();
//             const taskTags = await taskApi.getTaskTags();
//             dispatch({ type: taskConstants.LOAD_TASK_IN_LOCAL, taskId, platforms, taskTags });
//         }
//         catch (error) {
//             dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
//         }
//     }
// }


function addOrUpateTask(task, { platformId, startTime, endTime, pageIndex, pageSize }) {

    return async dispatch => {
        try {
            const result = await taskApi.addOrUpdateTask(task);
            const platforms = await taskApi.getPlatforms();
            const taskTags = await taskApi.getTaskTags();
            const tasksResult = await taskApi.loadTasks(platformId, startTime, endTime, pageIndex, pageSize);

            // console.log(result);
            dispatch({ type: taskConstants.COMMIT_TASK, message: buildMessage(result.message), tasks: tasksResult.data, totalCount: tasksResult.count, platforms, taskTags });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function addOrUpateTaskTag(taskTag) {
    return async dispatch => {
        try {
            const result = await taskApi.addOrUpdateTaskTag(taskTag);
            const platforms = await taskApi.getPlatforms();
            const taskTags = await taskApi.getTaskTags();
            dispatch({ type: taskConstants.COMMIT_TASK_TAG, taskTag: result.data, message: buildMessage(result.message), platforms, taskTags });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}