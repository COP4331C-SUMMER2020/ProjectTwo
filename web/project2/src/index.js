import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const INITIAL_STATE = {
  email: "",
  password: ""
};

function Index() {
	return (
		<div>
			<div>
				<Login />
				<Register />
			</div>
			<div>
				<IngredientSearch />
				<RecipeSearch />
				<AddRecipe />
			</div>	
			<div>
				<APIreturn />
			</div>
		</div>
	);
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

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);