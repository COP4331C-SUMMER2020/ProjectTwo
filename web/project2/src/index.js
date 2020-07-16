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

import "./styles.css";

const INITIAL_STATE = {
  email: "",
  password: ""
};

function Index() {
	var id = 0;
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
				</div>
			</BrowserRouter>
		</CookiesProvider>
	);
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);