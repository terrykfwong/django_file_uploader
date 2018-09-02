import * as FileActionTypes from '../actions/fileAction';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
    file: List([]),
});

const result = (state = initialState, action) => {
    if (action.response && action.response.result) {
        if(action.type === FileActionTypes.File_LIST_SUCCESS){
            return state.merge(fromJS({file: action.response.result}))
        }
        if(action.type === FileActionTypes.POST_FILE_SUCCESS){
            return state;
        }
    }

    return state;
};

export default result;