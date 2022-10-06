import { Navigate } from "react-router-dom";
import KeycloakService from "../services/KeycloakService"


//wrapper function for handling login/register with keycloak
const withKeycloak = Component => props => {

    const isLoggedIn = KeycloakService.isLoggedIn();

    if (isLoggedIn) {

        return <Component {...props} />
    } else {
        return <Navigate replace to="/login" />
    }

}

export default withKeycloak;