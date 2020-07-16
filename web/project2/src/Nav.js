import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';

function Nav() {
	const navStyle = {
		color: 'white'
	};
	
	return (
		<nav>
			<h2>24/7 Recipes</h2>
			<ul className="nav-links">
				<Link style={navStyle} to="/home">
					<li>Home</li>
				</Link>
				<Link style={navStyle} to="/user">
					<li>User</li>
				</Link>
				<Link style={navStyle} to="/testpage">
					<li>Test Page</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;