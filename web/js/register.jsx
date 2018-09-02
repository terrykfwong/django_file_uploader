'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './wrapper';
import { getHeader } from './utils';
import 'whatwg-fetch';
import {postRegister} from './actions/userAction';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Link } from 'react-router';


class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    render() {
        if(this.props.user) {
            if (this.props.query.next) {
                browserHistory.push(this.props.query.next);
            }
            else {
                browserHistory.push('/');
            }
        }

        return(
            <Wrapper>
                <div className="container-fluid">
                    <h2>Register</h2>
                    <div className="col-md-4 col-md-offset-4 registration">
                        <form method="post" onSubmit={ev => {
                            ev.preventDefault();
                            const header = getHeader('POST');
                            header.body = JSON.stringify(this.state);
                            this.props.postRegister(header);
                        }}>
                            <div className="alert alert-danger"
                                 role="alert"
                            >{this.props.error.get('error')}</div>
                            <div className="alert alert-success"
                                 role="alert"
                            >{this.props.message.get('message')}</div>
                            <div className="form-group">
                                <label htmlFor="username" className="control-label">
                                    Username
                                </label>
                                <input placeholder="Username" type="text" id="username"
                                       className="form-control" value={this.state.username}
                                       name="username"
                                       onChange={ev => this.setState({username: ev.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="control-label">
                                    Password
                                </label>
                                <input placeholder="Password" type="password"
                                       id="password" className="form-control" value={this.state.password}
                                       name="password"
                                       onChange={ev => this.setState({password: ev.target.value})}/>
                            </div>
                            <button type="submit" className="btn btn-primary"
                                    style={{width: '100%'}}
                                    disabled={!(this.state.username && this.state.password)}
                            >
                                Register
                            </button>
                            <h5>
                                Already have an account? Login <Link to='/login'>here.</Link>
                            </h5>
                        </form>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

Register.propTypes = {
    query: PropTypes.object.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    const { entities, routing: {locationBeforeTransitions: {query}}, error, message} = state;
    const { user } = entities.toJS();
    return { user, query, error, message};
};

export default connect(mapStateToProps, {
    postRegister,
})(Register);
