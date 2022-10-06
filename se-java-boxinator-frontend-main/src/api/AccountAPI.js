import { BASE_URL } from "."
import { authorizationHeaderInfo } from "./helper"
import KeycloakService from "../services/KeycloakService"

//endpoint for getting specific user data
export const getUserData = async () => {
    try {
        const response = await fetch(`${BASE_URL}accounts/${KeycloakService.getSubjectId()}`,{
            method: 'GET',
            headers: authorizationHeaderInfo()
        })
    
        if (!response.ok) {
            throw new Error("Something went wrong... Server response: " + response.status);
        }

        const data = await response.json();

        return [null, data.payload];

    } catch (error) {
        return [error.message, null]
    }
}

//endpoint for updating specific user data
export const updateUserData = async (dob, postal_code, contact_number, country) => {
    
    console.log("inputs", new Date(dob), postal_code, contact_number, country);
    try {
        const response = await fetch(`${BASE_URL}accounts/${KeycloakService.getSubjectId()}`,{
            method:'PUT',
            headers: authorizationHeaderInfo(),
            body: JSON.stringify({
                dob:dob,
                postalCode: postal_code,
                contactNumber: contact_number,
                country: country
            })
        })
    
        if(!response.ok) {
            throw new Error("Something went wrong... Server response: " + response.status)
        }
    
        const data = await response.json();
        
        return [null, data.payload];
    } catch(error) {
        return [error.message, null];
    }

}