import Keycloak from 'keycloak-js'
const keycloakConfig = {
   url: 'https://keycloak.energo.ru/auth',
   realm: 'App',
   clientId: 'test-client'
}
const keycloak = new Keycloak(keycloakConfig);
export default keycloak
