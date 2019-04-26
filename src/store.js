import {taskReducer } from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
    task:taskReducer,
 
  
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));