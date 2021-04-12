import axios from "axios";
import queryString from "querystring";
import { getSessionCookie, getSessionCookieRaw } from "components/cookies";

const REALM = "App";
const CLIENT_ID = "test-client";

export const keycloakAuth = (userInfo) => {
  const params = {
    // grant_type: "authorization_code",
    client_id: CLIENT_ID,
    username: userInfo.username,
    password: userInfo.password,
    // username: "test_local", //TODO remove after testing
    // password: "admin", //TODO remove after testing
    grant_type: "password",
  };

  const token_url =
    "https://keycloak.energo.ru/auth/realms/" +
    REALM +
    "/protocol/openid-connect/token";

  let userAuth = axios({
    method: "POST",
    url: token_url,
    data: queryString.stringify(params),
    config: {
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    },
  });

  return userAuth;
};