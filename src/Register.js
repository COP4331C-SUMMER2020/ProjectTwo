import React from "react";
import ReactDOM from "react-dom";

export default class Register extends React.Component {
	render() {
		function handleClick(e) {
			e.preventDefault();
			console.log('You clicked register!');
			
			var username = document.getElementById("registeremail").value;
			var fname = document.getElementById("registerfirst").value;
			var lname = document.getElementById("registerlast").value;
			var lPassword = document.getElementById("registerpassword").value;
			
			document.getElementById("registeremail").innerHTML = "";
			document.getElementById("registerpassword").innerHTML = "";
		
			var jsonPayload = '{"email" : "' + username + '", "firstName" : "' + fname +'", "lastName" : "' + lname +'", "password" : "' + lPassword + '"}';
			fetch('http://192.168.56.1:5000/api/register', {
				method: 'POST',
				headers: {
					'Content-type': 'application/json',
				},
				body: jsonPayload,
			}).then(res => {
				console.log(res)
				return res.json()
			}).then(response => {
				console.log(response)
			});
		}
	
		return (
			<div className="registerPage">
				<div className="container">
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