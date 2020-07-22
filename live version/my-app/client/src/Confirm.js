import React from "react";

export default class Confirm extends React.Component {
	constructor(props){
		super(props)
		
		var id = 0;
		var search = this.props.location.search;
		var params = new URLSearchParams(search);
		id = params.get('id');
		
		var jsonPayload = '{"userId" : "' + id + '"}';
		console.log(jsonPayload);
		
		fetch('https://group-247-recipe.herokuapp.com/api/confirm', {
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
			}
			else {
				document.getElementById("errorField").innerHTML = data.error;
			}
		})
		.catch((error) => {
			console.error('Error:', error);
			document.getElementById("errorField").innerHTML = error;
		});
	}
	render() {
		var id = 0;
		var search = this.props.location.search;
		var params = new URLSearchParams(search);
		id = params.get('id');
		return (
			<div className="registerPage">
				<h1 id="errorField">Your account is now confirmed!</h1>
			</div>
		);
	}
}