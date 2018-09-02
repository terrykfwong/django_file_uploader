'use strict';

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import AppRouter from './containers/appRouter';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
    <AppRouter store={store} history={history}/>,
    document.getElementById('content')
);
