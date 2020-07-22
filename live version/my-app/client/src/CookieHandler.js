import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import * as Cookies from "js-cookie";

function CookieHandler() {
	
}

export function setSessionCookie(session) {
	Cookies.remove("session");
	Cookies.set("session", session, { expires: 14 });
};

export function getSessionCookie() {
	const sessionCookie = Cookies.get("session");
	
	if (sessionCookie === undefined) {
		return {};
	} else {
		return JSON.parse(sessionCookie);
	}
};

export function removeSessionCookie() {
	Cookies.remove("session");
};

export default CookieHandler;