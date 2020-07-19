import React from "react";
import ReactDOM from "react-dom";
import {render} from "react-dom";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {CookiesProvider} from 'react-cookie';

import Home from "./Home";
import User from "./User";
import Nav from "./Nav";
import Register from "./Register";
import TestPage from "./TestPage";
import Confirm from "./Confirm";
import Reset from "./Reset";
import Login from "./Login";
import Logout from "./Logout";

import "./styles.css";

const INITIAL_STATE = {
  id: "",
  password: ""
};

function Index() {
	var id = 0;
	
	componentDidMount();
	
	return (
		<CookiesProvider>
			<BrowserRouter>
				<div className="outerContainer">
					<Nav />
					<Route path='/' exact component={Home} />
					<Route path='/user' exact component={User} />
					<Route path='/testpage' exact component={TestPage} />
					<Route path='/register' exact component={Register} />
					<Route path='/confirm' exact component={Confirm} />
					<Route path='/reset' exact component={Reset} />
					<Route path='/login' exact component={Login} />
					<Route path='/logout' exact component={Logout} />
				</div>
			</BrowserRouter>
		</CookiesProvider>
	);
}

function componentDidMount() {
	fetch('http://192.168.56.1:5000/api', {
		method: 'GET',
		headers: {
			'Content-type': 'application/json',
			'Accept': 'application/json'
		}
	}).then(res => {
		console.log(res)
		return res.json()
	}).then(response => {
		console.log(response)
	})
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);