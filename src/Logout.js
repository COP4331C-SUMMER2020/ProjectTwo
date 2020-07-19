import React from "react";
import { Redirect } from 'react-router-dom';
import { removeSessionCookie } from "./CookieHandler";

export default class Logout extends React.Component {
	render() {
		removeSessionCookie();
		return <Redirect to={'/'} />
	}
}