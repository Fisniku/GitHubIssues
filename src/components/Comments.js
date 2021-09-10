import React from 'react';
import {Link} from 'react-router-dom'
import { timeSince } from "../Helpers.js";

class Comments extends React.Component {
    state = {
        comments : [],
        fullIssueBody : null,
        issueData : null
    }
    componentDidMount = async () => {
        const issue_id = this.props.location.state.issue_id;
        const fullIssueBody = this.props.location.state.fullIssueBody;
        const issueData = this.props.location.state.issueData;
        const commentsApi = await fetch(`https://api.github.com/repos/facebook/react/issues/${issue_id}/comments`);
		const comments = await commentsApi.json(); 
		this.setState({comments, fullIssueBody, issueData});
    }

    render(){
        const {title, user, created_at, comments} = this.props.location.state.issueData;
        return (
            <div className="container">
                <div className="row mb-5">
                    <div className="col-12">  
                        <Link to={{ pathname: '/'}}>
                            Go Back!
                        </Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div class="card border-dark mb-3">
                            <div class="card-header"><h3>{title}</h3></div>
                            <div class="card-body text-dark mb-3">
                                <h5 class="card-title"><b>{user.login}</b> opened this issue {timeSince(new Date(created_at))} ago - {comments} comments</h5>
                                <hr/>
                                <div class="card-text"><pre>{this.state.fullIssueBody}</pre></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {this.state.comments.map((comment) => {
                            return (
                                <div class="card mb-3">
                                    <div class="card-header">
                                        <b>{comment.user.login}</b> -  
                                        commented &nbsp;&nbsp;
                                        {timeSince(new Date(comment.created_at))} ago
                                    </div>
                                    <div class="card-body">
                                        <pre class="card-text">{comment.body}</pre>
                                    </div>
                                </div>);    
                        })}
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">  
                        <Link to={{ pathname: '/'}}>
                            Go Back!
                        </Link>
                    </div>
                </div>     
            </div>
        );
    }
}
 
export default Comments;
