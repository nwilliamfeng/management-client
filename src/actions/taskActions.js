
import { taskConstants } from '../constants'
import {taskApi} from '../api'

export const taskActions = {
    loadTasks,
    createTask,
}

function loadTasks() {

    return { type: taskConstants.LOAD_TASK_LIST }
}

function createTask() {

   // return { type: taskConstants.CREATE_TASK,currentTask:taskApi.createTask() }

    return async dispatch => {
        // try {
            const currentTask = await taskApi.createTask();
            dispatch({ type: taskConstants.CREATE_TASK, currentTask});
        // }
        // catch (error) {
        //     dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: error.message })
        // }
    }
}