import {taskReducer,pointReducer ,customerReducer,giftReducer,customerDetailReducer,liquidationReducer,authReducer} from './reducers';
import thunkMiddleware from 'redux-thunk'; 
import {combineReducers,createStore,applyMiddleware} from 'redux';

const reducer= combineReducers({
    task:taskReducer,
    point:pointReducer,
    gift:giftReducer,
    customer:customerReducer,
    customerDetail:customerDetailReducer,
    liquidation:liquidationReducer,
    auth:authReducer,
})
 

export default createStore(reducer,  applyMiddleware(
    thunkMiddleware,  
  ));