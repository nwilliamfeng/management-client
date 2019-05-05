
import { taskConstants, dialogConstants } from '../constants'
import { taskApi } from '../api'
import { buildMessage } from './messageHelper'

export const taskActions = {
    getTasks,
    createTask,
    addOrUpateTask,
    getTaskInLocal,
}

function getTasks(platformId, startTime, endTime, pageIndex = 1, pageSize = 10) {
    return async dispatch => {
        try {
            const result = await taskApi.loadTasks(platformId, startTime, endTime, pageIndex, pageSize);
            dispatch({ type: taskConstants.LOAD_TASK_LIST, tasks: result.data, totalCount: result.totalCount });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function createTask() {
    return async dispatch => {
        try {
            const currentTask = await taskApi.createTask();
            const platforms = await taskApi.getPlatforms();
            const taskTags = await taskApi.getTaskTags();
            dispatch({ type: taskConstants.CREATE_TASK, currentTask, platforms, taskTags });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function getTaskInLocal(taskId) {
    return async dispatch => {
        try {
            const platforms = await taskApi.getPlatforms();
            const taskTags = await taskApi.getTaskTags();
            dispatch({ type: taskConstants.LOAD_TASK_IN_LOCAL, taskId, platforms, taskTags });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }

}


function addOrUpateTask(task) {

    return async dispatch => {
        const result = await taskApi.addOrUpdateTask(task);
        // console.log(result);
        dispatch({ type: taskConstants.COMMIT_TASK, task: result.data, message: buildMessage(result.message) });
    }
}