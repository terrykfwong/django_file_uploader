import React from 'react';
import moment from 'moment';

export function FileListTableRow(props){
    return (
        <tr>
            <td>
                { props.file.owner }
            </td>
            <td>
                <a href={`/api/v1/file/${encodeURIComponent(props.file.unique_name)}`}>
                    { props.file.name }
                </a>
            </td>
            <td>
                { moment(props.file.create).calendar() }
            </td>
            <td>
                { props.file.private ? <span className="glyphicon glyphicon-ok"/> : <span className="glyphicon glyphicon-remove"/>}
            </td>
        </tr>
    )
}