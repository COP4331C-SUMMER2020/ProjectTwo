import React from "react";
import ReactDOM from "react-dom";

export default class TestPage extends React.Component {
	render() {
		return (
			<div>
				<div>
					<Register />
					<Login />
				</div>
				<div>
					<RecipeSearch />
					<IngredientSearch />
					<AddRecipe />
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
		
		var jsonPayload = '{"Recipe" : "' + ingredient + '"}';
		
		fetch('http://group-247-recipe.herokuapp.com/api/searchRecipe', {
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
				document.getElementById("apireturn").innerHTML = data;
			}
			else {
				document.getElementById("apireturn").innerHTML = data.error;
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			document.getElementById("apireturn").innerHTML = error;
			return;
		});
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

function Login() {
	function handleClick(e) {
		e.preventDefault();
		console.log('You clicked login!');
		
		var username = document.getElementById("loginemail").value;
		var lPassword = document.getElementById("loginpassword").value;
		
		document.getElementById("loginemail").innerHTML = "";
		document.getElementById("loginpassword").innerHTML = "";
		
		var jsonPayload = '{"login" : "' + username + '", "password" : "' + lPassword + '"}';
		
		document.getElementById("apireturn").innerHTML = jsonPayload;
	}

	return (
		<div className="container">
			<h1>Login Test</h1>
			<form>
				<input
				 id="loginemail"
				 name="loginemail"
				 autoComplete="off"
				 placeholder="Your email address"
				/>
				<input
				 id="loginpassword"
				 name="loginpassword"
				 type="password"
				 placeholder="Choose a safe password"
				/>
				<div>
					<button
					 type="button"
					 onClick={handleClick}
					 type="submit">
						Login
					</button>
				</div>
			</form>
		</div>
	);
}

function Register() {
	function handleClick(e) {
		e.preventDefault();
		console.log('You clicked register!');
		
		var username = document.getElementById("registeremail").value;
		var lPassword = document.getElementById("registerpassword").value;
		
		document.getElementById("registeremail").innerHTML = "";
		document.getElementById("registerpassword").innerHTML = "";
		
		var jsonPayload = '{"login" : "' + username + '", "password" : "' + lPassword + '"}';
		
		document.getElementById("apireturn").innerHTML = jsonPayload;
	}

	return (
		<div className="container">
			<h1>Register Test</h1>
			<input
			 id="registeremail"
			 name="registeremail"
			 autoComplete="off"
			 placeholder="Your email address"
			/>
			<input
			 id="registerpassword"
			 name="registerpassword"
			 type="password"
			 placeholder="Choose a safe password"
			/>
			<div>
				<button
				 type="button"
				 onClick={handleClick}
				 type="submit">
					Register
				</button>
			</div>
		</div>
	);
}