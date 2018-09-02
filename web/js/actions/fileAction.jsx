import { CALL_API, Schemas } from '../middleware/api';
import { browserHistory } from 'react-router';

export const File_LIST_REQUEST = 'File_LIST_REQUEST';
export const File_LIST_SUCCESS = 'File_LIST_SUCCESS';
export const File_LIST_FAILURE = 'File_LIST_FAILURE';

const _getFileList = (header) => ({
    [CALL_API]: {
        types: [ File_LIST_REQUEST, File_LIST_SUCCESS, File_LIST_FAILURE ],
        endpoint: 'file',
        schema: Schemas.FILE_ARRAY,
        header: header
    }
});

export const getFileList = (header) => (dispatch, getState) => {
    return dispatch(_getFileList(header));
};

export const POST_FILE_REQUEST = 'POST_FILE_REQUEST';
export const POST_FILE_SUCCESS = 'POST_FILE_SUCCESS';
export const POST_FILE_FAILURE = 'POST_FILE_FAILURE';

const _postFile = (header) => ({
    [CALL_API]: {
        types: [ POST_FILE_REQUEST, POST_FILE_SUCCESS, POST_FILE_FAILURE ],
        endpoint: 'file/',
        schema: Schemas.FILE,
        header: header,
    }
});

export const postFile = (header) => (dispatch, getState) => {
    return dispatch(_postFile(header)).then(
        response => {
            if(response.type === POST_FILE_SUCCESS){
                browserHistory.push('/');
            }
        }
    );
};