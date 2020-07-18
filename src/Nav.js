import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

function Nav(props) {
	const navStyle = {
		color: 'white'
	};
	
	const isLoggedIn = props.isLoggedIn;
	
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
				<h2></h2>
				<Link style={navStyle} to="/">
					<li>24/7 Recipes</li>
				</Link>
				<Link style={navStyle} to="/testpage">
					<li>Test Page</li>
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
				<h2></h2>
				<Link style={navStyle} to="/">
					<li>24/7 Recipes</li>
				</Link>
				<Link style={navStyle} to="/testpage">
					<li>Test Page</li>
				</Link>
				<Link style={navStyle} to="/user">
					<li>My Pantry</li>
				</Link>
			</ul>
		</nav>
	)
}

export default Nav;