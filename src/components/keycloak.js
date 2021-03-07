import axios from "axios";
import queryString from "querystring";
import { getSessionCookie, getSessionCookieRaw } from "./cookies";

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

export const getUserListWithRoles = () => {
  const role_name = "upe_worker";
  const userInfo = getSessionCookie();
  console.log(userInfo);
  const token = getSessionCookieRaw();
  // const token = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxxcBXVzo/JO5eC4i5q0lOlGa3jZd2qtZyF/3H/qasmQLR/czLflYawdFWpG+74LwyIWkwV7ONKtVkotVBE9pR5KfDd2sv2TORQlBEsnPT7g8HmnYTowbo2dyCXOpsw2ZmUPmWFuMpNAJsD5ifpJGlX1D0ccAXRzuFLBRQ51g4Z+JNRqoNZQ7SGwwrjGLk9jNJyVhy/Tw1loimeJG9395T+/KrKi94dWZZL2LXcZmT7S4fsRRWReoYRxe0LzhD9IE7vHn5RRZqFFDWymV1Z2rf0w9MWlO4c/nUBUUTKqIntaJepflevvzTxPlEJOhJRKlIi6mwieE/D0ngeAptaaR1wIDAQAB';

  // const user_id =
  // const user_list_url =
  //   "https://keycloak.energo.ru/auth/admin/realms/" +
  //   REALM +
  //   "/clients/test-client/roles/" +
  //   role_name +
  //   "/users";

    const user_list_url =
      "https://keycloak.energo.ru/auth/admin/realms/" +
      REALM + "/users";
  //
  //     const params = {
  //       // grant_type: "authorization_code",
  //       client_id: CLIENT_ID,
  //       username: "test_local", //TODO remove after testing
  //       password: "admin", //TODO remove after testing
  //       grant_type: "password",
  //     };
  //
  //
  // // fetch(
  // //   "https://keycloak.energo.ru/auth/admin/realms/App/users", {mode: 'cors'}
  // // )
  // //   // .then((res) => res.json())
  // //   .then(
  // //     (result) => {
  // //       console.log(result);
  // //       // setLoading(false);
  // //       // setMeanAndLimit(result);
  // //     },
  // //     (error) => {
  // //       // setLoading(true);
  // //       // setError(error);
  // //     }
  //   );

  axios({
    method: "get",
    url: user_list_url,
    // data: queryString.stringify(params),
    config: {
      headers: {
        "Authorization": 'Bearer ' + userInfo.jti,
        // "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      },
    },
  })
    .then((response) => {
      console.log(response);
      // axios({
      //   method: "get",
      //   url: user_list_url,
      //   // data: queryString.stringify(params),
      //   config: {
      //     headers: {
      //       "Authorization": 'Bearer ' + token,
      //       // "Content-Type": "application/x-www-form-urlencoded",
      //       "Access-Control-Allow-Origin": "*",
      //       'Content-Type': 'application/json'
      //     },
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     //TODO show error message invalid credentialds
      //     console.error(error);
      //   });
    })
    .catch((error) => {
      //TODO show error message invalid credentialds
      console.error(error);
    });


  // return userAuth;
};
