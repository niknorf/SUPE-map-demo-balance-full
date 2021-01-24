import * as Cookies from "js-cookie";
import React from "react";
import jwt from "jwt-decode";

export const setSessionCookie = (session: any): void => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const removeSessionCookie = (history) => {
  Cookies.remove("session");
  history.push("/");
};

export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    const userInfo = jwt(sessionCookie);
    return userInfo;
  }
};

export const SessionContext = React.createContext(getSessionCookie());
