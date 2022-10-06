import KeycloakService from "../services/KeycloakService"

//Function for implementing headers data in api requests that need it
export const authorizationHeaderInfo = () => {
    return KeycloakService.isLoggedIn()? {
        'Allow-Access-Control-Origin': 'http://localhost:3000',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + KeycloakService.getToken()
    } :
    {
        'Allow-Access-Control-Origin': 'http://localhost:3000',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
}