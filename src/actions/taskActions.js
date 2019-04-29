
import { taskConstants } from '../constants'
import {taskApi} from '../api'

export const taskActions = {
    loadTasks,
    createTask,
    addTask,
}

function loadTasks() {

    return { type: taskConstants.LOAD_TASK_LIST }
}

function createTask() {
    return async dispatch => {
        // try {
            const currentTask = await taskApi.createTask();
            const platforms=await taskApi.getPlatforms();
            const taskTags=await taskApi.getTaskTags();
            dispatch({ type: taskConstants.CREATE_TASK, currentTask,platforms,taskTags});
        // }
        // catch (error) {
        //     dispatch({ type: dialogConstants.SHOW_ERROR_ATTACH, errorMessage: error.message })
        // }
    }
}


function addTask(task) {

     return async dispatch => {
              await taskApi.addTask(task);
            
           //  dispatch({ type: taskConstants.CREATE_TASK, currentTask,platforms,taskTags});
     }
 }