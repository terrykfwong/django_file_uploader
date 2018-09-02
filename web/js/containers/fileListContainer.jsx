import React from 'react';
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import { getHeader } from '../utils';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Wrapper from '../wrapper';
import { SplitButton, MenuItem } from 'react-bootstrap';
import { Checkbox } from 'react-bootstrap';
import { getFileList } from '../actions/fileAction';
import { FileListTable } from './fileListTable';

const loadData = ({ getFileList }) => {
    getFileList(getHeader('GET'));
};

class FileListContainer extends React.Component {
    componentDidMount(){
        loadData(this.props);
    }

    render() {
        const files = this.props.result.toJS().file.map(f => this.props.file[f]);

        return (
            <Wrapper>
                <FileListTable files={files}/>
            </Wrapper>
        );
    }
}

FileListContainer.propTypes = {
    result: PropTypes.object.isRequired,
    user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => {
    const { entities, result, view } = state;
    const { file } = entities.toJS();

    return { file, result, view };
};

const mapDispatchToProps = { getFileList };

export default connect(mapStateToProps, mapDispatchToProps)(FileListContainer);
