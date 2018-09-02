import { CALL_API, Schemas } from '../middleware/api';
import { getFileList } from './fileAction';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';

const _getUser = () => ({
    [CALL_API]: {
        types: [ USER_REQUEST, USER_SUCCESS, USER_FAILURE ],
        endpoint: 'current-session',
        schema: Schemas.USER,
        header: {credentials: 'same-origin'},
    }
});

export const loadUser = () => (dispatch, getState) => {
    return dispatch(_getUser());
};

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

const _postLogin = (header) => ({
    [CALL_API]: {
        types: [ LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE ],
        endpoint: 'login',
        schema: Schemas.USER,
        header: header,
    }
});

export const postLogin = (header) => (dispatch, getState) => {
    return dispatch(_postLogin(header));
};

export const POST_REGISTRATION_REQUEST = 'POST_REGISTRATION_REQUEST';
export const POST_REGISTRATION_SUCCESS = 'POST_REGISTRATION_SUCCESS';
export const POST_REGISTRATION_FAILURE = 'POST_REGISTRATION_FAILURE';

const _postRegister = (header) => ({
    [CALL_API]: {
        types: [ POST_REGISTRATION_REQUEST, POST_REGISTRATION_SUCCESS, POST_REGISTRATION_FAILURE ],
        endpoint: 'register',
        schema: Schemas.USER,
        header: header,
    }
});

export const postRegister = (header) => (dispatch, getState) => {
    return dispatch(_postRegister(header));
};

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

const logoutUser = (header) => ({
    [CALL_API]: {
        types: [ LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE ],
        endpoint: 'logout',
        schema: Schemas.USER,
        header: header,
    }
});

export const toLogoutUser = (header) => (dispatch, getState) => {
    let { entities } = getState();

    if(!entities.toJS().user){
        return;
    }

    return dispatch(logoutUser(header)).then(
        response => {
            if(response.type === LOGOUT_SUCCESS){
                return dispatch(getFileList(header));
            }
        }
    );
};
