import Keycloak from "keycloak-js";
import { useNavigate } from "react-router-dom";

const _keycloak = new Keycloak("./keycloak.json");
const pageUrl = process.env.NODE_ENV === 'production'
      ? window.location.origin +  '/se-java-boxinator-frontend/'
      : window.location.origin;



/**
 * Initialise Keycloak
 * @param {function} onAuthenticated 
 */

const initKeycloak = onAuthenticated => {
	
	_keycloak
		.init({
			onLoad: 'check-sso',
    		silentCheckSsoRedirectUri: pageUrl + '/silent-check-sso.html',
    		pkceMethod: 'S256',
		})
		.then(onAuthenticated)
		.catch(() => {
			console.log('something went wrong...');
		})
};

/**
 * Execute Keycloak Login
 */
const doLogin = _keycloak.login;

/**
 * Execute Keycloak Logout.
 */
const doLogout = _keycloak.logout;

/**
 * Get the current token
 * @returns string | undefined
 */
const getToken = () => _keycloak.token;

/**
 * Check for an existing session
 * @returns boolean
 */
const isLoggedIn = () => !!_keycloak.token;

/**
 * Update the token
 * @param {function} successCallback 
 * @returns void
 */
const updateToken = (successCallback) =>
	_keycloak.updateToken(5)
		.then(successCallback)
		.catch(doLogin);

/**
 * Get the current users' username
 * @returns string | undefined
 */
const getUsername = () => _keycloak.tokenParsed?.family_name;
const getRole = () => _keycloak.tokenParsed?.roles[1];
const getParsedToken = () => _keycloak.tokenParsed;
const getGivenName = () => _keycloak.tokenParsed?.given_name;
const getSubjectId = () => _keycloak.tokenParsed?.sub

/**
 * Check if user has any of the given roles
 * @param {string} role 
 * @returns boolean
 */
const hasRole = (role) => _keycloak.tokenParsed?.roles.some((tokenRole) => role === tokenRole);

const accountManagement = () => _keycloak.accountManagement();

_keycloak.onTokenExpired = () => {
	updateToken(() => {console.log("Token refreshed!");});
}

const KeycloakService = {
	initKeycloak,
	doLogin,
	doLogout,
	getToken,
	isLoggedIn,
	updateToken,
	getUsername,
	hasRole,
    getParsedToken,
    getRole,
	getGivenName,
	getSubjectId,
	accountManagement
};

export default KeycloakService

/**
 * Special thanks to Niko Köbler for his tutorial on React with keycloak
 * Source code: https://github.com/dasniko/keycloak-reactjs-demo
 */
