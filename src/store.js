import {taskReducer,pointReducer ,giftReducer} from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
    task:taskReducer,
    point:pointReducer,
    gift:giftReducer,
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));