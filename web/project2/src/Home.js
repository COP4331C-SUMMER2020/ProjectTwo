import React from "react";
import {Link} from 'react-router-dom';

export default class Home extends React.Component {
	render() {
		return (
			<div className = "homePage">
				<div className = "homeContainer">
					<h3>Welcome to 24/7 Recipes</h3>
					<p>Explore what your pantry can do</p>
					<Link to="/register">
						<button
						 className="registerButton"
						 type="button">
							Register
						</button>
					</Link>
				</div>
			</div>
		);
	}
}