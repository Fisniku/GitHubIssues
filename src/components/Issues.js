import React from 'react';
import Issue from './Issue'

const Issues = (props) => (
    <div className="container">
        <div className="row">
            <div className='list-group'>
                <div href="#" className="list-group-item list-group-item-action">
                    <div className='row'>
                        <div className='col-12'>
                            <h5>Total issues : {props.total_issues}</h5>
                        </div>
                    </div>
                </div>
                {props && props.issues && props.issues.length !=0 ?
                    props.issues.map((issue) => {
                        return (
                            <Issue key={issue.id} issue={issue} />
                        );
                }) : null}
            </div>
        </div>
    </div>
   
);

export default Issues;