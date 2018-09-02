'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {Router} from 'react-router';
import {createRoutes} from '../routes';
import DevTools from './DevTools';
import { Provider } from 'react-redux';
import {loadUser} from '../actions/userAction';
import { connect } from 'react-redux';

const loadData = ({ loadUser }) => {
    loadUser();
};

class AppRouter extends React.Component {
    componentDidMount(){
        loadData(this.props);
    }

    render() {
        return (
            <Provider store={this.props.store}>
                <div>
                    <Router history={this.props.history} routes={createRoutes(this.props.store)} />
                    <DevTools />
                </div>
            </Provider>
        );
    }
}

AppRouter.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { entities: { user }, } = state;
    return { user, };
};

export default connect(mapStateToProps, {
    loadUser,
})(AppRouter);
