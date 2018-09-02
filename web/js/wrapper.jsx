'use strict';

import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import 'whatwg-fetch';
import {version, release, githash, build_date} from './version';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getHeader } from './utils';
import {toLogoutUser} from './actions/userAction';
import {NavDropdown, MenuItem} from 'react-bootstrap';


class Wrapper extends React.Component {
    logout(ev){
        ev.preventDefault();
        const header = getHeader('get');

        this.props.toLogoutUser(header);
    }

    render() {
        moment.locale('en-GB');
        return (
            <div>
                <nav className='navbar'>
                    <div className="navbar-inner">
                        <div className="container">
                            <Link className="navbar-brand" to='/'>
                                Django file uploader
                            </Link>
                            <ul className='nav navbar-nav'>
                                <li><Link to='/upload'>Upload</Link></li>
                            </ul>
                            <ul className='nav navbar-nav navbar-right'>
                                { !this.props.user ? (
                                    <li><Link to={ '/login?next=' +  (this.props.pathname ? this.props.pathname : '')}>Login</Link></li>
                                ):(

                                    <NavDropdown title={ this.props.user } id="basic-nav-dropdown">
                                        <MenuItem onClick={ev => this.logout(ev)}>Logout as { this.props.user }</MenuItem>
                                    </NavDropdown>
                                )}
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div id='main-row' className='row'>
                        { this.props.children }
                    </div>
                    <footer className='footer row'>
                        <div>
                            <hr />
                            <p className='text-muted'>Copyright &copy; {moment().year()} All rights reserved.<br/>
                                version={version}-{release}.{githash}<br/>
                                build date={build_date}
                            </p>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

Wrapper.propTypes = {
    pathname: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
    user: PropTypes.string,
    toLogoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const { entities, routing: {locationBeforeTransitions}} = state;
    let pathname = locationBeforeTransitions && locationBeforeTransitions.pathname ? locationBeforeTransitions.pathname : '';
    const { user } = entities.toJS();
    return { user, pathname};
};

export default connect(mapStateToProps, { toLogoutUser })(Wrapper);
