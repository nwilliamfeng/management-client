
import { taskConstants, dialogConstants } from '../constants'
import { taskApi } from '../api'
import { buildMessage } from './messageHelper'

export const taskActions = {
    getTasks,
    createTask,
    addOrUpateTask,
    getTaskInLocal,
    getTaskTags,
    addOrUpateTaskTag,   
}

function getTasks(platformId, startTime, endTime, pageIndex = 1, pageSize = 10) {
    return async dispatch => {
        try {
            const platforms= await taskApi.getPlatforms();    
            const result = await taskApi.loadTasks(platformId, startTime, endTime, pageIndex, pageSize);
            dispatch({ type: taskConstants.LOAD_TASK_LIST, tasks: result.data, totalCount: result.count ,platforms});
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: buildMessage(error.message) })
        }
    }
}

function getTaskTags() {
    return async dispatch => {
        try {
            const platforms= await taskApi.getPlatforms();    
            const taskTags = await taskApi.getTaskTags();
            dispatch({ type: taskConstants.GET_TASK_TAGS, taskTags,platforms });
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

function addOrUpateTaskTag(taskTag) {
    return async dispatch => {
        const result = await taskApi.addOrUpdateTaskTag(taskTag);
        dispatch({ type: taskConstants.COMMIT_TASK_TAG, taskTag: result.data, message: buildMessage(result.message) });
    }
}