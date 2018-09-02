import { Map, List, fromJS } from 'immutable';
import * as UserActionTypes from '../actions/userAction';


let initialState = Map({
    message: null
});


// Updates error message to notify about the failed fetches.
const error = (state = initialState, action) => {
    let { type, message } = action;

    if(type === UserActionTypes.POST_REGISTRATION_SUCCESS){
        return state.set('message', 'Your have successfully registered.')
    }

    return state.set('message', null);
};

export default error;