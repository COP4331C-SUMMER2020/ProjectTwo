import React from "react";

export default class Recipe extends React.Component {
	state = { results: null };
	constructor(props){
		super(props)
		
		var name = "";
		var search = props.location.search;
		var params = new URLSearchParams(search);
		name = params.get('name');
		
		var jsonPayload = '{"Recipe" : "' + name + '"}';
		
		fetch('https://group-247-recipe.herokuapp.com/api/viewRecipe', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: jsonPayload,
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
			if (data.error == "") {
				this.setState({ results: data });
			}
			else {
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	render() {
		
		var data = this.state.results;
		const viewer = []
		
		if (data != null) {
			viewer.push(
				<div className="recipePage">
					<div className="recipeBlock">
						<h4>Recipe Name: {data.results.Recipe}</h4>
						<h1>Ingredients Needed</h1>
						<p>{data.results.Ingredients}</p>
						<h1>Procedure</h1>
						<p>{data.results.Procedure}</p>
					</div>
				</div>
			)
		}
		
		return (
			<div>
				{viewer}
			</div>
		);
	}
}