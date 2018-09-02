'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './wrapper';
import { getHeader, readCookie } from './utils';
import 'whatwg-fetch';
import {postFile} from './actions/fileAction';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';


class Upload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            private: true,
        }
    }

    render() {
        if(!this.props.user) {
            browserHistory.push('/login?next=/upload');
        }

        return(
            <Wrapper>
                <div className="container-fluid">
                    <h2>Upload</h2>
                    <div className="col-md-4 col-md-offset-4"
                         style={{border: '1px solid rgb(216, 222, 226)', borderRadius: '5px', padding: '30px'}}>
                        <form method="post" onSubmit={ev => {
                            ev.preventDefault();
                            let data = new FormData();
                            data.append('file', this.state.file);
                            data.append('private', this.state.private);

                            const header = getHeader('POST');
                            header.body = data;
                            this.props.postFile(header);
                        }}>
                            <div className="alert alert-danger" role="alert"></div>
                            <div className="form-group">
                                <label htmlFor="file" className="control-label">
                                    File
                                </label>
                                <input type='file' id='fileInput' onChange={ev => this.setState({file: ev.target.files[0]})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="private" className="control-label">
                                    Private
                                </label>
                                <input placeholder="Private" type="checkbox"
                                       id="private" className="form-control" checked={this.state.private}
                                       name="private"
                                       onChange={ev => this.setState({private: !this.state.private})}/>
                            </div>
                            <button type="submit"
                                    className="btn btn-primary"
                                    disabled={!this.state.file}
                                    style={{width: '100%'}}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </Wrapper>
        );
    }
}

Upload.propTypes = {
    postFile: PropTypes.func.isRequired,
    query: PropTypes.object.isRequired,
    user: PropTypes.string,
};

const mapStateToProps = (state, ownProps) => {
    const { entities , routing: {locationBeforeTransitions: {query}}} = state;
    const { user } = entities.toJS();
    return { user, query};
};

export default connect(mapStateToProps, {
    postFile,
})(Upload);
