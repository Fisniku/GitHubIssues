import React, { Component } from 'react';
import './css/App.css';
import Issues from './components/Issues';

class App extends Component {
	state = {
		issues : {},
		current_page : null,
		search : '',
		paginationPages : 6
	}

	//Fetch github issues		
	getIssues = async (search, page = 1) => {
		const issuesApi = await fetch(`https://api.github.com/search/issues?page=${page}&q=${search}%20in:title,body%20is:issue%20repo:facebook/react`);
		const issues = await issuesApi.json(); 
		this.setState({issues: issues, current_page: page});
	}

	componentDidUpdate = () => {
		const issues = JSON.stringify(this.state.issues);
		localStorage.setItem('issues', issues);
		localStorage.setItem('current_page', this.state.current_page);
	}

	componentDidMount = () => {
		const issues = JSON.parse(localStorage.getItem('issues'));
		if(issues){
			this.setState({issues: issues, current_page: localStorage.getItem('current_page')});
		}else{
			this.getIssues(this.state.search);
		}
	}

	//Paginate through results 
	paginate = (where) => {
		let page = parseInt(this.state.current_page);

		switch(where){
			case 'prev':
				if(page > 1) page -= 1;
			break;
			case 'next':
				page += 1;
			break;
			default:
				page = where;
			break;
		}
		
		this.getIssues(this.state.search, page)
		this.setState({current_page: page});
	}

	onChangeInput = (event) => {
		this.setState({search: event.target.value});
	}

	searchClicked = () => {
		this.getIssues(this.state.search);
	}

	clearResults = () => {
		this.getIssues('');
		this.setState({search: '', current_page :1});
	}

	checkIfActive = (page) => {
		return this.state.current_page == page ?  "page-item active" : "page-item";
	}

	checkIfDisabled = () => {
		return this.state.current_page == 1 ?  "page-item disabled" : "page-item";
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title"> facebook/react Issues </h1>
				</header>
				<div className="input-group container">
					<input 
						name="search" 
						value={this.state.search} 
						onChange={this.onChangeInput.bind(this)} 
						type="text" 
						className="form-control" 
						placeholder="Search for ..." />
					<div className="input-group-append">
						<button  onClick={this.searchClicked} className="btn btn-outline-primary" type="submit" >Search</button>
					</div>
					<div className="input-group-append">
						<button onClick={this.clearResults} className="btn btn-outline-danger" >Clear</button>
					</div>
				</div>

				<Issues issues={this.state.issues.items} total_issues = {this.state.issues.total_count}/>
				
				<div className="paginator">
					<ul className="pagination">
						<li className={this.checkIfDisabled()}>
							<button onClick={() => this.paginate('prev')}  className="page-link" href="#" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
								<span className="sr-only">Previous</span>
							</button>
						</li>
						{[...Array(this.state.paginationPages)].map((e, i) => i != 0 && 
							<li key={i+'_'+e} className={this.checkIfActive(i)}>
								<button onClick={() => this.paginate(i)} className="page-link" href="#">{i}</button>
							</li>)
						}
						<li className="page-item">
							<button onClick={() => this.paginate('next')} className="page-link" href="#" aria-label="Next">
								<span aria-hidden="true">&raquo;</span>
								<span className="sr-only">Next</span>
							</button>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

export default App;