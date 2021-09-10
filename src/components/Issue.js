import React from 'react';
import {Link} from 'react-router-dom';
import { timeSince, lightOrDark} from "../Helpers.js";

class Issue extends React.Component {
    render() { 
        const {title, comments, labels, number, created_at, user, body} = this.props.issue; 
        return (               
            <div href="#" className="list-group-item list-group-item-action">
                <div className='row'>
                    <div className='col-7 d-flex'>
                        <Link to={{ 
                            pathname: `/comments/${number}`, 
                            state: { issue_id: number, fullIssueBody: body, issueData: this.props.issue }
                        }}>
                            <b><h6>{title}</h6></b>
                        </Link>                                        
                    </div>
                    <div className='col-4'>
                        {labels && labels.length!=0 ? 
                            labels.map((label) => {
                                const color = lightOrDark(label.color) == 'light' ? 'black' : 'white';
                                return (
                                    <span key={label.id} style={{backgroundColor: '#'+label.color, color: color}} className="badge rounded-pill mr-2">
                                        {label.name}
                                    </span>
                                );
                            })
                        : null}
                    </div>
                    <div className='col-1'>
                        <h4 className="text-muted">
                            {comments} <i className="fa fa-comments"> </i>
                        </h4>
                    </div>
                </div>
            
                <div className='row'>
                    <div className='col-6 d-flex'>
                        <small className="text-muted">
                            # {number}  - Opened {timeSince(new Date(created_at))} ago by <b>{user.login}</b>
                        </small>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Issue;
