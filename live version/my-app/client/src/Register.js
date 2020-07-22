import React from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";

export default class Register extends React.Component {
	state = { redirect: null };
	render() {
		const handleClick = async e => {
			e.preventDefault();
			console.log('You clicked register!');
			
			var username = document.getElementById("registeremail").value;
			var fname = document.getElementById("registerfirst").value;
			var lname = document.getElementById("registerlast").value;
			var lPassword = document.getElementById("registerpassword").value;
			
			document.getElementById("registeremail").innerHTML = "";
			document.getElementById("registerpassword").innerHTML = "";
		
			var jsonPayload = '{"email" : "' + username + '", "firstName" : "' + fname +'", "lastName" : "' + lname +'", "password" : "' + lPassword + '"}';
			fetch('https://group-247-recipe.herokuapp.com/api/register', {
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
					this.setState({ redirect: "/registernotice" });
				}
				else {
					document.getElementById("errorReturn").innerHTML = data.error;
				}
			})
			.catch((error) => {
				console.error('Error:', error);
				document.getElementById("errorReturn").innerHTML = error;
				return;
			});
		};
		
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}
	
		return (
			<div className="registerPage">
				<div className="recipeBlock">
					<h4>Register</h4>
					<input
					id="registeremail"
					name="registeremail"
					autoComplete="off"
					placeholder="Your email address"
					/>
					<input
					id="registerfirst"
					name="registerfirst"
					autoComplete="off"
					placeholder="Your first name"
					/>
					<input
					id="registerlast"
					name="registerlast"
					autoComplete="off"
					placeholder="Your last name"
					/>
					<input
					id="registerpassword"
					name="registerpassword"
					type="password"
					placeholder="Choose a safe password"
					/>
					<p id="passwordError" className="errorReturn" />
					<div>
						<button
						className="registerButton2"
						type="button"
						onClick={handleClick}
						type="submit">
							Create Account
						</button>
					</div>
				</div>
			</div>
		);
	}
}