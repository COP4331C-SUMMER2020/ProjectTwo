import React from "react";

export default class User extends React.Component {
	render() {
		return (
			<div className="userPage">
				<div>
					<AddRecipe />
					<RecipeSearch />
					<IngredientSearch />
				</div>
				<div>
					<APIreturn />
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

function AddRecipe() {
	function handleClick(e) {
		e.preventDefault();
		console.log('You clicked add!');
		
		var ingredient = document.getElementById("newrecipename").value;
		
		document.getElementById("newrecipename").innerHTML = "";
		
		var jsonPayload = '{"recipe" : "' + ingredient + '"}';
		
		document.getElementById("apireturn").innerHTML = jsonPayload;
	}
	
	return (
		<div className="container">
			<h1>Add Recipe</h1>
			<form>
				<input
				 id="newrecipename"
				 name="newrecipename"
				 autoComplete="off"
				 placeholder="Recipe Name"
				/>
				<div>
				<button
				 type="button"
				 onClick={handleClick}
				 type="submit">
					Search
				</button>
				</div>
			</form>
		</div>
	);
}

function IngredientSearch() {
	function handleClick(e) {
		e.preventDefault();
		console.log('You clicked search!');
		
		var ingredient = document.getElementById("ingredientname").value;
		
		document.getElementById("ingredientname").innerHTML = "";
		
		var jsonPayload = '{"ingredient" : "' + ingredient + '"}';
		
		document.getElementById("apireturn").innerHTML = jsonPayload;
	}
	
	return (
		<div className="container">
			<h1>Ingredient Search</h1>
			<form>
				<input
				 id="ingredientname"
				 name="ingredientname"
				 autoComplete="off"
				 placeholder="Search Term"
				/>
				<div>
				<button
				 type="button"
				 onClick={handleClick}
				 type="submit">
					Search
				</button>
				</div>
			</form>
		</div>
	);
}

function RecipeSearch() {
	function handleClick(e) {
		e.preventDefault();
		console.log('You clicked search but different!');
		
		var ingredient = document.getElementById("recipename").value;
		
		document.getElementById("recipename").innerHTML = "";
		
		var jsonPayload = '{"recipe" : "' + ingredient + '"}';
		
		document.getElementById("apireturn").innerHTML = jsonPayload;
	}
	
	return (
		<div className="container">
			<h1>Recipe Search</h1>
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
				 onClick={handleClick}
				 type="submit">
					Search
				</button>
				</div>
			</form>
		</div>
	);
}