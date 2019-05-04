
import { taskConstants,dialogConstants } from '../constants'
import { taskApi } from '../api'

export const taskActions = {
    getTasks,
    createTask,
    addTask,
}

function getTasks(pageIndex=1, pageSize=10) {
    return async dispatch => {
        try {
            const result = await taskApi.loadTasks(pageIndex,pageSize);          
            dispatch({ type: taskConstants.LOAD_TASK_LIST, tasks:result.data,totalCount:result.totalCount });
        }
        catch (error) {
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: error.message })
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
            dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: error.message })
        }
    }
}


function addTask(task) {

    return async dispatch => {
        await taskApi.addTask(task);

        //  dispatch({ type: taskConstants.CREATE_TASK, currentTask,platforms,taskTags});
    }
}