import React, { Component } from 'react';
import _ from 'lodash';

import './projects.css'

class GitHub extends Component{

	constructor(props){

		super(props)
this.state = {
	requestFailed:false
}
}

componentWillMount(){
	this.refresh()


}

refresh() {
	fetch('https://api.github.com/users/NoorSulaiman/repos?sort=created&per_page=5')
.then(res => {if(!res.ok){throw Error("Network request failed")}
return res
})

.then(data => data.json())
.then(data => {this.setState({githubData: data})
}, ()=> {this.setState({requestFailed: true})
})
}



render(){
	if(this.state.requestFailed) return <p>Failed!</p>
if(!this.state.githubData) return <p> Loading...</p>
const data = this.state.githubData;
var i = 0;
var myProjects = _.map(data,(project)=>{
	i++
	return <li className={"item"+i} key={Math.random()}>
	<a href={project.html_url} target="_blank"><h4>{project.name}</h4></a>
	<p>Description : {project.description}</p>
	<p>Language : {project.language}</p>
	<p>Created at : {project.created_at}</p>

	</li>


})



return <div className="githubData">
<div className="btn">
<button onClick={this.refresh.bind(this)} className="button" > Current Projects </button>
<ul>
{myProjects}
</ul>
</div>
<div>
</div>
</div>		
}
}

export default GitHub;