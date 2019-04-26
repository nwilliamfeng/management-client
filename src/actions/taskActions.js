
import { taskConstants } from '../constants'

export const taskActions = {
    loadTasks,
    createTasks,
}

function loadTasks() {

    return { type: taskConstants.LOAD_TASK_LIST }
}

function createTasks() {

    return { type: taskConstants.CREATE_TASK }
}