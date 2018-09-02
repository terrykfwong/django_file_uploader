import React from 'react';
import { FileListTableRow }from './fileListTableRow';

export function FileListTable(props){
    return (
        <table className='table table-striped table-bordered table-condensed'>
            <thead>
            <tr>
                <th>Owner</th>
                <th>Name</th>
                <th>Create Time</th>
                <th>Private</th>
            </tr>
            </thead>
            <tbody>
            { props.files.map((file, index) =>
                <FileListTableRow
                    key={index}
                    file={file}/>
            )}
            </tbody>
        </table>
    )
}