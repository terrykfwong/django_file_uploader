import React from 'react';
import Login from './login';
import Register from './register';
import Upload from './upload';
import FileListContainer from './containers/fileListContainer';
import { Route } from 'react-router';
import NotFound from './components/notFound';


export function createRoutes({ dispatch, getState}) { // eslint-disable-line react/prop-types
    function requireAuth(nextState, replace) {
        if (!getState().entities.toJS().user) {
            replace({pathname: '/login', query: {next: nextState.location.pathname}});
        }
    }

    return (
        <Route>
            <Route path='/' component={FileListContainer}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/upload' component={Upload}/>
            <Route path='*' component={NotFound}/>
        </Route>
    );
}
