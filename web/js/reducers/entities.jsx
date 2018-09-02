import { Map, List, fromJS } from 'immutable';
import * as UserActionTypes from '../actions/userAction';
import * as FileActionTypes from '../actions/fileAction';

const initialState = Map({
    file: List([]),
    user: null,
});

// Updates an entity cache in response to any action with response.entities.
const entities = (state = initialState, action) => {
    if (action.type === UserActionTypes.USER_SUCCESS ||
        action.type === UserActionTypes.LOGIN_USER_SUCCESS) {
        return state.set(
            'user', action.response.entities.user[action.response.result].username
        );
    }
    if (action.type === UserActionTypes.LOGOUT_SUCCESS) {
        return state.set('user', null);
    }
    if(action.type === FileActionTypes.POST_FILE_SUCCESS){
        return state;
    }
    if (action.response && action.response.result) {
        return state.merge(fromJS(action.response.entities));
    }

    return state;
};

export default entities;
