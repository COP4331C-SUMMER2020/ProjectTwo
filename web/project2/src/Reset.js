import React from "react";

export default class Reset extends React.Component {
	render() {
		var id = 0;
		var search = this.props.location.search;
		var params = new URLSearchParams(search);
		id = params.get('id');
		return (
			<div>
				<h1>The Reset Page</h1>
				<p>User ID: { id }</p>
			</div>
		);
	}
}