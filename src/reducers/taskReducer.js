import {taskConstants} from '../constants'



const initValue={currentTask:null,tasks:[],platforms:[],taskTags:[]}

export const taskReducer=(state=initValue,action)=>{
    switch(action.type){
        case taskConstants.CREATE_TASK:
            return {...state, currentTask: action.currentTask,platforms:action.platforms,taskTags:action.taskTags};
        default:
            return {...state};
    }
}