import {taskReducer,pointReducer ,customerReducer,giftReducer} from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
    task:taskReducer,
    point:pointReducer,
    gift:giftReducer,
    customer:customerReducer,
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));