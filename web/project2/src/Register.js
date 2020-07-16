import React from "react";
import ReactDOM from "react-dom";

export default class Register extends React.Component {
	render() {
		function handleClick(e) {
			e.preventDefault();
			console.log('You clicked register!');
			
			var username = document.getElementById("registeremail").value;
			var lPassword = document.getElementById("registerpassword").value;
			
			document.getElementById("registeremail").innerHTML = "";
			document.getElementById("registerpassword").innerHTML = "";
		
			var jsonPayload = '{"login" : "' + username + '", "password" : "' + lPassword + '"}';
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