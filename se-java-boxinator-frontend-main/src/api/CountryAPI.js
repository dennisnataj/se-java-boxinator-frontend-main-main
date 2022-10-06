import { BASE_URL } from "."
import { authorizationHeaderInfo } from "./helper"

//endpoint for getting country data

export const getCountryData = async () => {
    try {
        const response = await fetch(`${BASE_URL}settings/countries`, {
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

//endpoint for updating specific country data
export const updateCountryData = async (id, multiplier) => {

    try{
        const response = await fetch(`${BASE_URL}settings/countries/${id}`, {
            method:'PUT',
            headers:authorizationHeaderInfo(),
            body: JSON.stringify({
                id: id,
                multiplier: multiplier
            })

        })
        if(!response.ok) {
            throw new Error("Something went wrong... Server response: " + response.status)
        }

        const data = await response.json();
        
        return [null, data.payload];
    } catch(error) {
        return [error.message, null]
    }
}
