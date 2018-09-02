import entities from './entities';
import result from './result';
import error from './error';
import message from './message';

import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';


const rootReducer = combineReducers({
    entities,
    result,
    error,
    message,
    routing,
});

export default rootReducer;
