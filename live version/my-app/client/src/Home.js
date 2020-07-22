import React from "react";
import {Link} from 'react-router-dom';
import { getSessionCookie } from './CookieHandler';

export default class Home extends React.Component {
	render() {
		var isLoggedIn = false;
		
		var currentCookie = getSessionCookie();
		if (currentCookie._id != undefined) {
			isLoggedIn = true;
		}
		
		if(isLoggedIn) {
			return <UserHome />
		}
		
		return <GuestHome />
	}
}

function GuestHome() {
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
			<div className="poweredBy">
				<p>Powered by WikiBooks</p>
			</div>
		</div>
	);
}

function UserHome() {
	return (
		<div className = "homePage">
			<div className = "homeContainer">
				<h3>Welcome to 24/7 Recipes</h3>
				<p>Welcome back!</p>
				<Link to="/user">
					<button
					 className="registerButton"
					 type="button">
						My Pantry
					</button>
				</Link>
			</div>
			<div className="poweredBy">
				<p>Powered by WikiBooks</p>
			</div>
		</div>
	);
}