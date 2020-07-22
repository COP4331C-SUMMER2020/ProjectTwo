import React from "react";
import { Redirect } from "react-router-dom";
import { setSessionCookie, getSessionCookie } from "./CookieHandler";

export default class Login extends React.Component {
	state = { redirect: null };
	render() {
		const handleSubmit = async e => {
			e.preventDefault();
			
			document.getElementById("emailError").innerHTML = "";
			document.getElementById("passwordError").innerHTML = "";
			var username = document.getElementById("loginemail").value;
			if (username == "") {
				document.getElementById("emailError").innerHTML = "Please enter an email.";
				return;
			}
			var lPassword = document.getElementById("loginpassword").value;
			if (lPassword == "") {
				document.getElementById("passwordError").innerHTML = "Please enter a password.";
				return;
			}
			
			document.getElementById("loginemail").value = "";
			document.getElementById("loginpassword").value = "";
			document.getElementById("loginButton").innerHTML = "Loading...";
			
			var jsonPayload = '{"email" : "' + username + '", "password" : "' + lPassword + '"}';
			
			fetch('https://group-247-recipe.herokuapp.com/api/login', {
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
					setSessionCookie(data);
					this.setState({ redirect: "/" });
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
			
			document.getElementById("loginButton").innerHTML = "Login";
		};
		
		const handleForgot = async e => {
			e.preventDefault();
			
			var username = document.getElementById("loginemail").value;
			if (username == "") {
				document.getElementById("emailError").innerHTML = "Please enter an email.";
				return;
			}
			document.getElementById("emailError").innerHTML = "";
			
			document.getElementById("loginemail").value = "";
			document.getElementById("loginpassword").value = "";
			
			var jsonPayload = '{"email" : "' + username + '"}';
			
			fetch('https://group-247-recipe.herokuapp.com/api/email', {
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
					setSessionCookie(data);
					this.setState({ redirect: "/resetnotice" });
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
					<h4>Login</h4>
					<form>
						<input
						 id="loginemail"
						 name="loginemail"
						 autoComplete="off"
						 placeholder="Your email address"
						/>
						<p id="emailError" className="errorReturn" />
						<input
						 id="loginpassword"
						 name="loginpassword"
						 type="password"
						 placeholder="Choose a safe password"
						/>
						<p id="passwordError" className="errorReturn" />
						<div>
							<button
							 className="resetButton"
							 id="resetButton"
							 onClick={handleForgot}
							 type="submit">
								Forgot Password
							</button>
						</div>
						<div>
							<button
							 type="button"
							 id="loginButton"
							 onClick={handleSubmit}
							 type="submit">
								Login
							</button>
						</div>
						<p
						 id="errorReturn"
						 className="errorReturn" 
						/>
					</form>
				</div>
			</div>
		);
	}
}