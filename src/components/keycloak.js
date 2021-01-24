import axios from "axios";
import queryString from "querystring";



export const keycloakAuth = (userInfo) => {
  const params = {
    // grant_type: "authorization_code",
    client_id: "test-client",
    // username: refUsername.current.value,
    // password: redPassword.current.value,
    username: "test_local", //TODO remove after testing
    password: "admin", //TODO remove after testing
    grant_type: "password",
  };

  let userAuth = axios({
    method: "post",
    url:
      "https://keycloak.energo.ru/auth/realms/App/protocol/openid-connect/token",
    data: queryString.stringify(params),
    config: {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      },
    },
  });

  return userAuth;
};
