import React from "react";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom';

export default class User extends React.Component {
	state = { recipeResults: null, ingredientResults: null };
	render() {
		const handleIngredients = async e => {
			e.preventDefault();
			
			var ingredient1 = document.getElementById("ingredient1").value;
			var ingredient2 = document.getElementById("ingredient2").value;
			var ingredient3 = document.getElementById("ingredient3").value;
			
			var jsonPayload = '{"ingredients" : [';
			if (ingredient1 != "") jsonPayload += '"' + ingredient1 + '"';
			if (ingredient1 != "" && ingredient2 != "" || ingredient1 != "" && ingredient3 != "") jsonPayload += ",";
			if (ingredient2 != "") jsonPayload += '"' + ingredient2 + '"';
			if (ingredient2 != "" && ingredient3 != "") jsonPayload += ",";
			if (ingredient3 != "") jsonPayload += '"' + ingredient3 + '"';
			jsonPayload += ']}';
			
			fetch('http://192.168.56.1:5000/api/searchIngredients', {
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
					this.setState({ recipeResults: null });
					this.setState({ ingredientResults: data });
				}
				else {
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				return;
			});
		}
		
		const handleRecipes = async e => {
			e.preventDefault();
			
			var ingredient = document.getElementById("recipename").value;
			
			document.getElementById("recipename").innerHTML = "";
			
			var jsonPayload = '{"Recipe" : "' + ingredient + '"}';
			
			fetch('http://192.168.56.1:5000/api/searchRecipe', {
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
					this.setState({ ingredientResults: null });
					this.setState({ recipeResults: data });
				}
				else {
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				return;
			});
		};
		var linker = "";
		var rdata = this.state.recipeResults;
		const rrecipes = []
		
		if (rdata != null) {
			rrecipes.push(
				<thead className="header">
					<tr>
						<th>Recipe Name</th>
					</tr>
				</thead>
			)
			for (var i = 0; i < rdata.results.length; i++)
			{
				linker = "/recipe?name=" + rdata.results[i].Recipe;
				rrecipes.push(
					<tbody key={i}>
						<tr key={i}>
							<td id={i} key={i}>
								<Link to={linker}>
									<li>{rdata.results[i].Recipe}</li>
								</Link>
							</td>
						</tr>
					</tbody>
				)
			}
		}
		
		var idata = this.state.ingredientResults;
		const irecipes = []
		
		if (idata != null) {
			irecipes.push(
				<thead className="header">
					<tr>
						<th>Recipe Name</th>
					</tr>
				</thead>
			)
			for (var i = 0; i < idata.results.length; i++)
			{
				linker = "/recipe?name=" + idata.results[i].Recipe;
				irecipes.push(
					<tbody key={i}>
						<tr key={i}>
							<td id={i} key={i}>
								<Link to={linker}>
									<li>{idata.results[i].Recipe}</li>
								</Link>
							</td>
						</tr>
					</tbody>
				)
			}
		}
		
		const result = []
		if (idata != null || rdata != null)
		{
			result.push(
				<table className="resultsTable">
					{irecipes}
					{rrecipes}
				</table>
			)
		}

		return (
			<div className="userPage">
				<div>
					<div className="container">
						<h5>Recipe Search</h5>
						<form>
							<input
							 id="recipename"
							 name="recipename"
							 autoComplete="off"
							 placeholder="Search Term"
							/>
							<div>
								<button
								 type="button"
								 onClick={handleRecipes}
								 type="submit">
									Search
								</button>
							</div>
						</form>
					</div>
					<div className="container">
						<h5>Ingredient Search</h5>
						<form>
							<input
							 id="ingredient1"
							 name="ingredient1"
							 autoComplete="off"
							 placeholder="Search Term"
							/>
							<input
							 id="ingredient2"
							 name="ingredient2"
							 autoComplete="off"
							 placeholder="Search Term"
							/>
							<input
							 id="ingredient3"
							 name="ingredient3"
							 autoComplete="off"
							 placeholder="Search Term"
							/>
							<div>
								<button
								 type="button"
								 onClick={handleIngredients}
								 type="submit">
									Search
								</button>
							</div>
						</form>
					</div>
				</div>
				<div className="container">
					{result}
				</div>
			</div>
		);
	}
}

function APIreturn() {
	return (
		<div className="container">
			<h1>API Return</h1>
			<textarea
				id="apireturn"
				name="apireturn"
				row="4"
				cols="50"
			/>
		</div>
	);
}