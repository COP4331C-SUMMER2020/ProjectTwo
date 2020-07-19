import React from "react";
import { Redirect } from "react-router-dom";
import { setSessionCookie, getSessionCookie } from "./CookieHandler";

export default class Login extends React.Component {
	state = { redirect: null };
	render() {
		const handleSubmit = async e => {
			e.preventDefault();
			console.log('You clicked login!');
			
			var username = document.getElementById("loginemail").value;
			var lPassword = document.getElementById("loginpassword").value;
			
			document.getElementById("loginemail").innerHTML = "";
			document.getElementById("loginpassword").innerHTML = "";
			document.getElementById("loginButton").innerHTML = "Loading...";
			
			var jsonPayload = '{"email" : "' + username + '", "password" : "' + lPassword + '"}';
			
			fetch('http://192.168.56.1:5000/api/login', {
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
				document.getElementById("errorReturn").innerHTML = data.error;
				return;
			});
			
			document.getElementById("loginButton").innerHTML = "Login";
		};
		
		if (this.state.redirect) {
			return <Redirect to={this.state.redirect} />
		}

		return (
			<div className="registerPage">
				<div className="container">
					<h4>Login Test</h4>
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