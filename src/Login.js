import React from "react";

export default class Login extends React.Component {
	render() {
		function handleClick(e) {
			e.preventDefault();
			console.log('You clicked login!');
			
			var username = document.getElementById("loginemail").value;
			var lPassword = document.getElementById("loginpassword").value;
			
			document.getElementById("loginemail").innerHTML = "";
			document.getElementById("loginpassword").innerHTML = "";
			
			var jsonPayload = '{"email" : "' + username + '", "password" : "' + lPassword + '"}';
			
			fetch('http://192.168.56.1:5000/api/login', {
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
							 onClick={handleClick}
							 type="submit">
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}