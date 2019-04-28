import {taskReducer,pointReducer } from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
    task:taskReducer,
    point:pointReducer,
  
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));