import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
import { getSessionCookie } from './CookieHandler';

function Nav(props) {
	const navStyle = {
		color: 'white'
	};
	
	var isLoggedIn = false;
	
	var currentCookie = getSessionCookie();
	if (currentCookie._id != undefined) {
		isLoggedIn = true;
		console.log(currentCookie);
	}
	
	if(isLoggedIn) {
		return <UserLink />
	}
	
	return <GuestLink />
}

function GuestLink(props) {
	const navStyle = {
		color: 'white'
	};
	
	return (
		<nav className="navClass">
			<ul className="nav-links">
				<Link style={navStyle} to="/">
					<li>24/7 Recipes</li>
				</Link>
				<Link style={navStyle} to="/login">
					<li>Login</li>
				</Link>
			</ul>
		</nav>
	)
}

function UserLink(props) {
	const navStyle = {
		color: 'white'
	};
	
	return (
		<nav className="navClass">
			<ul className="nav-links">
				<Link style={navStyle} to="/">
					<li>24/7 Recipes</li>
				</Link>
				<Link style={navStyle} to="/user">
					<li>My Pantry</li>
				</Link>
				<Link style={navStyle} to="/logout">
					<li>Logout</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Nav;