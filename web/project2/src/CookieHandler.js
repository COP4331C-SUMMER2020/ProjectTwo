import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import * as Cookies from "js-cookie";

function CookieHandler() {
	
}

export const setSessionCookie = (session: any): void => {
	Cookies.remove("session");
	Cookies.set("session", session, { expires: 14 });
};

export const getSessionCookie: any = () => {
	const sessionCookie = Cookies.get("session");
	
	if (sessionCookie === undefined) {
		return {};
	} else {
		return JSON.parse(sessionCookie);
	}
};

export default CookieHandler;