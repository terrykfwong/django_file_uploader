import { Map, List, fromJS } from 'immutable';
import * as UserActionTypes from '../actions/userAction';


let initialState = Map({
    error: null
});


// Updates error message to notify about the failed fetches.
const error = (state = initialState, action) => {
    let { type, error } = action;

    if(type === UserActionTypes.LOGIN_USER_FAILURE && action.error){
        return state.set('error', action.error)
    }
    else if(type === UserActionTypes.POST_REGISTRATION_FAILURE && action.error){
        return state.set('error', action.error)
    }

    return state.set('error', null);
};

export default error;