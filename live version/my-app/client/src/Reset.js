import React from "react";
import { Redirect } from "react-router-dom";

export default class Reset extends React.Component {
	state = { redirect: null };
	render() {
		var id = 0;
		var search = this.props.location.search;
		var params = new URLSearchParams(search);
		id = params.get('id');
		const handleSubmit = async e => {
			e.preventDefault();
			
			document.getElementById("passwordError").innerHTML = "";
			var lPassword = document.getElementById("loginpassword").value;
			if (lPassword == "") {
				document.getElementById("passwordError").innerHTML = "Please enter a password.";
				return;
			}
			
			var jsonPayload = '{"userId" : "' + id + '", "password" : "' + lPassword + '"}';
			
			fetch('https://group-247-recipe.herokuapp.com/api/reset', {
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
					this.setState({ redirect: "/login" });
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
				<form>
					<input
					 id="loginpassword"
					 name="loginpassword"
					 type="password"
					 placeholder="Your new password"
					/>
					<p className="passwordError" id="passwordError" />
					<div>
						<button
						 id="resetButton"
						 onClick={handleSubmit}
						 type="submit">
							Reset Password
						</button>
					</div>
				</form>
			</div>
		);
	}
}