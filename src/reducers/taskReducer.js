import {taskConstants} from '../constants'



const initValue={currentTask:null,tasks:[]}

export const taskReducer=(state=initValue,action)=>{
    switch(action.type){
        case taskConstants.CREATE_TASK:
            return {...state, currentTask: action.currentTask};
        default:
            return {...state};
    }
}